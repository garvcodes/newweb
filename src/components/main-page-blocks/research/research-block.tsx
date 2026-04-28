import { researchProjects } from "@/data/resume";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import Image from "next/image";

export function ResearchBlock() {
  return (
    <section className="container py-16 md:py-24" id="research">
      <SectionHeader eyebrow="iv." title="Research Projects" />
      <div className="mt-6">
        {researchProjects.map((paper) => (
          <article
            key={paper.title}
            className="grid gap-3 border-t border-rule py-7 md:grid-cols-[10rem_1fr] md:gap-8"
          >
            <p className="sans text-sm italic text-muted-foreground">
              {paper.venue}
            </p>
            <div className="md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-8">
              <div>
                <h3 className="serif text-h-item leading-snug">
                  {paper.link ? (
                    <Link
                      href={paper.link.href}
                      className="transition-colors hover:text-[hsl(var(--accent-color))]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {paper.title}
                    </Link>
                  ) : (
                    paper.title
                  )}
                </h3>
                <p className="mt-2 sans text-[15px] leading-relaxed text-foreground/85">
                  {paper.description}
                </p>
                <p className="mt-3 sans text-xs uppercase tracking-wider text-muted-foreground">
                  {paper.stack.join(" / ")}
                </p>
                {paper.link && (
                  <Link
                    href={paper.link.href}
                    className="mt-3 inline-block accent-link sans text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {paper.link.label} &rarr;
                  </Link>
                )}
              </div>
              {paper.figure && (
                <Link
                  href={paper.link?.href ?? "#"}
                  target={paper.link ? "_blank" : undefined}
                  rel={paper.link ? "noopener noreferrer" : undefined}
                  className="group mt-5 block w-full max-w-[14rem] md:mt-0 md:w-[14rem]"
                  aria-label={paper.figure.alt}
                >
                  <div className="overflow-hidden rounded-md border border-rule bg-background/40 shadow-sm transition-all duration-300 group-hover:border-[hsl(var(--accent-color))] group-hover:shadow-md">
                    <Image
                      src={paper.figure.src}
                      alt={paper.figure.alt}
                      width={560}
                      height={400}
                      className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  {paper.figure.caption && (
                    <span className="mt-2 block sans text-xs italic text-muted-foreground transition-colors group-hover:text-[hsl(var(--accent-color))]">
                      {paper.figure.caption}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
