import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="container flex w-full flex-col items-center justify-between gap-3 py-8 sans text-xs text-muted-foreground md:flex-row">
        <p className="italic">
          &copy; {new Date().getFullYear()} Garv Goswami. Set in Labrada.
        </p>
        <div className="flex gap-5">
          <Link
            href={siteConfig.links.github}
            className="transition-colors hover:text-[hsl(var(--accent-color))]"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            className="transition-colors hover:text-[hsl(var(--accent-color))]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-[hsl(var(--accent-color))]"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
