import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/section-header";

export function ContactBlock() {
  return (
    <section className="container py-20 md:py-28" id="contact">
      <SectionHeader eyebrow="vi." title="Get in Touch" />
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <p className="serif max-w-xl text-2xl italic leading-snug text-foreground/90 md:text-3xl">
          I&rsquo;m always happy to hear from collaborators, researchers, and
          students working on problems at the boundary of biology and machine
          learning.
        </p>
        <div className="sans flex flex-col gap-2 text-sm">
          <Link href={`mailto:${siteConfig.email}`} className="accent-link">
            {siteConfig.email}
          </Link>
          <Link
            href={siteConfig.links.github}
            className="accent-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/garvcodes
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            className="accent-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/garv-goswami
          </Link>
        </div>
      </div>
    </section>
  );
}
