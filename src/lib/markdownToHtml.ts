import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import javascript from "highlight.js/lib/languages/javascript";
import remarkGfm from "remark-gfm";

type MarkdownNode = {
  type?: string;
  url?: string;
  value?: string;
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
  children?: MarkdownNode[];
};

type HtmlNode = {
  type?: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HtmlNode[];
};

type EditorialBlockDefinition = {
  nodeType: string;
  tagName: "aside" | "blockquote" | "section";
  className: string;
  additionalClassName?: string;
  ariaLabel: string;
  visibleLabel?: string;
};

const editorialBlocks: Record<string, EditorialBlockDefinition> = {
  tangent: {
    nodeType: "tangent",
    tagName: "aside",
    className: "tangent",
    ariaLabel: "Tangent",
  },
  "where-we-left-off": {
    nodeType: "whereWeLeftOff",
    tagName: "aside",
    className: "where-we-left-off",
    ariaLabel: "Where we left off",
    visibleLabel: "Where we left off",
  },
  "research-question": {
    nodeType: "researchQuestion",
    tagName: "aside",
    className: "research-question",
    ariaLabel: "Research question",
    visibleLabel: "Research question",
  },
  "example-data": {
    nodeType: "exampleData",
    tagName: "section",
    className: "example-data",
    ariaLabel: "Example data",
  },
  "results-table": {
    nodeType: "resultsTable",
    tagName: "section",
    className: "results-table",
    ariaLabel: "Results table",
  },
  "comparison-table": {
    nodeType: "comparisonTable",
    tagName: "section",
    className: "results-table",
    additionalClassName: "comparison-table",
    ariaLabel: "Comparison table",
  },
  "key-result": {
    nodeType: "keyResult",
    tagName: "aside",
    className: "key-result",
    ariaLabel: "Key result",
    visibleLabel: "Key result",
  },
  "probability-bars": {
    nodeType: "probabilityBars",
    tagName: "section",
    className: "probability-bars",
    ariaLabel: "Token probabilities",
    visibleLabel: "Token probabilities",
  },
  "direct-quote": {
    nodeType: "directQuote",
    tagName: "blockquote",
    className: "direct-quote",
    ariaLabel: "Direct quote",
  },
};

function rewritePostImages(postSlug?: string) {
  return (tree: MarkdownNode) => {
    if (!postSlug) return;

    const visit = (node: MarkdownNode) => {
      if (node.type === "image" && node.url) {
        const imagePath = node.url.match(/^(?:\.\/)?pics\/(.+)$/)?.[1];

        if (imagePath) {
          const encodedPath = imagePath
            .split("/")
            .map(encodeURIComponent)
            .join("/");
          node.url = `/api/blog-assets/${encodeURIComponent(
            postSlug
          )}/${encodedPath}`;
        }
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}

function createEditorialBlocks() {
  return (tree: MarkdownNode) => {
    const children = tree.children ?? [];
    const transformedChildren: MarkdownNode[] = [];

    const paragraphText = (node: MarkdownNode) =>
      node.type === "paragraph"
        ? node.children
            ?.map((child) => child.value ?? "")
            .join("")
            .trim()
        : undefined;

    for (let index = 0; index < children.length; index += 1) {
      const child = children[index];
      if (!child) continue;

      const blockMatch = paragraphText(child)?.match(/^(:{2,3})\s*([a-z-]+)$/i);
      const marker = blockMatch?.[1];
      const blockType = blockMatch?.[2]?.toLowerCase();
      const blockDefinition = blockType
        ? editorialBlocks[blockType]
        : undefined;

      if (!blockDefinition) {
        transformedChildren.push(child);
        continue;
      }

      const closingIndex = children.findIndex(
        (candidate, candidateIndex) =>
          candidateIndex > index && paragraphText(candidate) === marker
      );

      if (closingIndex === -1) {
        throw new Error(
          `${blockType ?? "Editorial"} block is missing its closing ${
            marker ?? "colon"
          } marker`
        );
      }

      const blockChildren = children.slice(index + 1, closingIndex);
      const visibleLabel = blockDefinition.visibleLabel;
      const attribution = blockChildren.at(-1);

      if (
        blockType === "direct-quote" &&
        attribution &&
        /^[—–-]\s*/.test(paragraphText(attribution) ?? "")
      ) {
        attribution.data = {
          hName: "cite",
          hProperties: { className: ["direct-quote-attribution"] },
        };
      }

      transformedChildren.push({
        type: blockDefinition.nodeType,
        data: {
          hName: blockDefinition.tagName,
          hProperties: {
            className: [
              blockDefinition.className,
              ...(blockDefinition.additionalClassName
                ? [blockDefinition.additionalClassName]
                : []),
            ],
            ariaLabel: blockDefinition.ariaLabel,
          },
        },
        children: visibleLabel
          ? [
              {
                type: `${blockDefinition.nodeType}Label`,
                data: {
                  hName: "p",
                  hProperties: {
                    className: [`${blockDefinition.className}-label`],
                  },
                },
                children: [{ type: "text", value: visibleLabel }],
              },
              ...blockChildren,
            ]
          : blockChildren,
      });
      index = closingIndex;
    }

    tree.children = transformedChildren;
  };
}

function createInlineOperations() {
  const parseOperations = (value: string): MarkdownNode[] => {
    const nodes: MarkdownNode[] = [];
    const operationPattern =
      /[\\/](bold|highlight|positive|negative|mixed)\s*\{([^{}]+)\}/gi;
    let textStart = 0;

    for (const match of value.matchAll(operationPattern)) {
      const matchIndex = match.index ?? 0;
      const operation = match[1]?.toLowerCase();
      const operationText = match[2];

      if (matchIndex > textStart) {
        nodes.push({ type: "text", value: value.slice(textStart, matchIndex) });
      }

      if (operation && operationText) {
        if (operation === "bold") {
          nodes.push({
            type: "strong",
            children: [{ type: "text", value: operationText }],
          });
        } else if (operation === "highlight") {
          nodes.push({
            type: "highlight",
            data: {
              hName: "mark",
              hProperties: { className: ["text-highlight"] },
            },
            children: [{ type: "text", value: operationText }],
          });
        } else {
          nodes.push({
            type: "metricValue",
            data: {
              hName: "span",
              hProperties: { className: [`metric-${operation}`] },
            },
            children: [{ type: "text", value: operationText }],
          });
        }
      }

      textStart = matchIndex + match[0].length;
    }

    if (textStart < value.length) {
      nodes.push({ type: "text", value: value.slice(textStart) });
    }

    return nodes.length > 0 ? nodes : [{ type: "text", value }];
  };

  return (tree: MarkdownNode) => {
    const visit = (node: MarkdownNode) => {
      if (["code", "inlineCode", "html"].includes(node.type ?? "")) return;

      node.children = node.children?.flatMap((child) => {
        if (child.type === "text" && child.value) {
          return parseOperations(child.value);
        }

        visit(child);
        return child;
      });
    };

    visit(tree);
  };
}

function captionPostImages() {
  return (tree: HtmlNode) => {
    const visit = (node: HtmlNode) => {
      node.children = node.children?.map((child) => {
        const image =
          child.tagName === "p" && child.children?.length === 1
            ? child.children[0]
            : undefined;
        const caption = image?.properties?.title;

        if (image?.tagName === "img" && typeof caption === "string") {
          delete image.properties?.title;

          return {
            type: "element",
            tagName: "figure",
            properties: {},
            children: [
              image,
              {
                type: "element",
                tagName: "figcaption",
                properties: {},
                children: [{ type: "text", value: caption }],
              },
            ],
          };
        }

        visit(child);
        return child;
      });
    };

    visit(tree);
  };
}

function styleProbabilityBars() {
  const nodeHasClass = (node: HtmlNode, className: string) => {
    const classes = node.properties?.className;
    return Array.isArray(classes) && classes.includes(className);
  };

  const nodeText = (node: HtmlNode): string =>
    node.value ?? node.children?.map(nodeText).join("") ?? "";

  return (tree: HtmlNode) => {
    const visit = (node: HtmlNode) => {
      if (nodeHasClass(node, "probability-bars")) {
        const table = node.children?.find((child) => child.tagName === "table");
        const tableBody = table?.children?.find(
          (child) => child.tagName === "tbody"
        );

        tableBody?.children?.forEach((row) => {
          if (row.tagName !== "tr") return;

          const cells = row.children?.filter((child) => child.tagName === "td");
          const probabilityText = cells?.at(-1)
            ? nodeText(cells.at(-1) as HtmlNode)
            : "";
          const probability = Number.parseFloat(
            probabilityText.match(/\d+(?:\.\d+)?/)?.[0] ?? ""
          );

          if (Number.isFinite(probability)) {
            row.properties = {
              ...row.properties,
              className: ["probability-row"],
              style: `--probability: ${Math.min(
                100,
                Math.max(0, probability)
              )}%`,
            };
          }
        });
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}

function normalizeEditorialMarkers(markdownString: string) {
  const normalizedLines: string[] = [];
  let codeFence: "`" | "~" | undefined;

  markdownString.split("\n").forEach((line) => {
    const fence = line.trimStart().match(/^(`{3,}|~{3,})/)?.[1];
    if (fence) {
      const fenceCharacter = fence[0] as "`" | "~";
      codeFence = codeFence === fenceCharacter ? undefined : fenceCharacter;
    }

    const marker = line.trim().match(/^:{2,3}(?:\s*[a-z][a-z-]*)?$/i)?.[0];
    if (!codeFence && marker) {
      if (normalizedLines.at(-1) !== "") normalizedLines.push("");
      normalizedLines.push(marker, "");
      return;
    }

    normalizedLines.push(line);
  });

  return normalizedLines.join("\n");
}

export default async function markdownToHtml(
  markdownString: string,
  postSlug?: string
) {
  const result = await unified()
    .use(markdown)
    .use(rewritePostImages, postSlug)
    .use(createEditorialBlocks)
    .use(createInlineOperations)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(captionPostImages)
    .use(styleProbabilityBars)
    .use(rehypeHighlight, { languages: { javascript } })
    .use(html, { allowDangerousHtml: true })
    .use(remarkGfm)
    .process(normalizeEditorialMarkers(markdownString));
  return result.toString();
}
