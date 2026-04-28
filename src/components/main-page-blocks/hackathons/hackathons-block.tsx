import { hackathonProjects } from "@/data/resume";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";

export function HackathonsBlock() {
  return (
    <section className="container py-16 md:py-24" id="hackathons">
      <SectionHeader eyebrow="v." title="Hackathon Projects" />
      <div className="mt-6 grid gap-px bg-rule md:grid-cols-3">
        {hackathonProjects.map((project) => (
          <Link
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-background p-6 transition-colors hover:bg-muted"
          >
            <h3 className="serif text-h-item">
              <span className="border-b border-transparent transition-colors group-hover:border-[hsl(var(--accent-color))] group-hover:text-[hsl(var(--accent-color))]">
                {project.title}
              </span>
            </h3>
            <p className="mt-2 sans text-[15px] leading-relaxed text-foreground/85">
              {project.description}
            </p>
            <p className="mt-4 sans text-xs uppercase tracking-wider text-muted-foreground">
              {project.tags.join(" / ")}
            </p>
            <p className="mt-3 sans text-xs italic text-[hsl(var(--accent-color))]">
              {project.linkLabel ?? "View project"} &rarr;
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
