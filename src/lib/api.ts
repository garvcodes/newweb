import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

type PostEntry = {
  slug: string;
  directory: string;
  markdownPath: string;
  draft: boolean;
};

function getPostEntries(): PostEntry[] {
  const entries = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const directory = join(postsDirectory, entry.name);
      const markdownFiles = fs
        .readdirSync(directory, { withFileTypes: true })
        .filter((file) => file.isFile() && file.name.endsWith(".md"));

      if (markdownFiles.length !== 1) {
        throw new Error(
          `Expected exactly one Markdown file in ${directory}, found ${markdownFiles.length}`
        );
      }

      const markdownFile = markdownFiles[0];
      if (!markdownFile) {
        throw new Error(`No Markdown file found in ${directory}`);
      }

      return {
        slug: markdownFile.name.replace(/\.md$/, ""),
        directory,
        markdownPath: join(directory, markdownFile.name),
        draft:
          matter(fs.readFileSync(join(directory, markdownFile.name), "utf8"))
            .data.draft === true,
      };
    });

  const publishedEntries = entries.filter((entry) => !entry.draft);
  const slugs = publishedEntries.map((entry) => entry.slug);
  const duplicateSlug = slugs.find(
    (slug, index) => slugs.indexOf(slug) !== index
  );

  if (duplicateSlug) {
    throw new Error(`Duplicate blog post slug: ${duplicateSlug}`);
  }

  return publishedEntries;
}

export function getPostSlugs() {
  return getPostEntries().map((entry) => entry.slug);
}

export function getPostDirectoryBySlug(slug: string) {
  return getPostEntries().find((entry) => entry.slug === slug)?.directory;
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const postEntry = getPostEntries().find((entry) => entry.slug === realSlug);

  if (!postEntry) {
    throw new Error(`Blog post not found: ${realSlug}`);
  }

  const fileContents = fs.readFileSync(postEntry.markdownPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "paperLink") {
      const frontmatter = data as Record<string, unknown>;
      const paperLink = frontmatter.paperLink ?? frontmatter["paper link"];
      if (typeof paperLink === "string") {
        items[field] = paperLink;
      }
    }

    if (typeof data[field] !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) =>
      new Date(post1.date as string).getTime() >
      new Date(post2.date as string).getTime()
        ? -1
        : 1
    );
  return posts;
}
