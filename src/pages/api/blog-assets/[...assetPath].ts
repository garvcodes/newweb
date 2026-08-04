import fs from "fs";
import { extname, join, relative, resolve, sep } from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPostDirectoryBySlug } from "@/lib/api";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).end();
    return;
  }

  const assetPath = req.query.assetPath;
  if (!Array.isArray(assetPath) || assetPath.length < 2) {
    res.status(404).end();
    return;
  }

  const [slug, ...pathSegments] = assetPath;
  if (!slug || pathSegments.some((segment) => !segment || segment === "..")) {
    res.status(400).end();
    return;
  }

  const postDirectory = getPostDirectoryBySlug(slug);
  if (!postDirectory) {
    res.status(404).end();
    return;
  }

  const picsDirectory = resolve(postDirectory, "pics");
  const filePath = resolve(join(picsDirectory, ...pathSegments));
  const relativePath = relative(picsDirectory, filePath);

  if (relativePath.startsWith(`..${sep}`) || relativePath === "..") {
    res.status(400).end();
    return;
  }

  const contentType = contentTypes[extname(filePath).toLowerCase()];
  if (
    !contentType ||
    !fs.existsSync(filePath) ||
    !fs.statSync(filePath).isFile()
  ) {
    res.status(404).end();
    return;
  }

  res.setHeader("Content-Type", contentType);
  res.setHeader(
    "Cache-Control",
    process.env.NODE_ENV === "production"
      ? "public, max-age=3600, stale-while-revalidate=86400"
      : "no-store"
  );

  if (req.method === "HEAD") {
    res.status(200).end();
    return;
  }

  fs.createReadStream(filePath).pipe(res);
}
