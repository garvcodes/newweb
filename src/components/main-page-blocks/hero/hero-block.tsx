import Link from "next/link";
import { siteConfig } from "@/config/site";

export function HeroBlock() {
  return (
    <section
      className="container flex min-h-[70vh] flex-col justify-center pb-16 pt-12 md:pt-20"
      id="top"
    >
      <p className="small-caps mb-6 text-sm text-[hsl(var(--accent-color))]">
        Garv Goswami
      </p>
      <h1 className="serif text-display-sm font-medium leading-[1.05] tracking-tight md:text-display">
        Student at UC Berkeley, focusing on {" "}
        <span className="italic text-[hsl(var(--accent-color))]">
          machine learning
        </span>{" "}
        and the{" "}
        <span className="italic text-[hsl(var(--accent-color))]">
          life sciences
        </span>
        .
      </h1>
      <p className="sans mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        I&rsquo;m an undergrad in CS, mostly just trying to be useful and keep
        learning. Along the way I&rsquo;ve been lucky to work as a machine
        learning intern at{" "}
        <span className="editorial-underline">Phare Bio</span> and as a student
        researcher in the <span className="editorial-underline">Ronda Lab</span>{" "}
        at the Innovative Genomics Institute, where I help out on generative
        models for protein and small-molecule design.
      </p>

      <p className="sans mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        As for general engineering experience, I&rsquo;ve been fortunate to work
        across the stack on amazing teams at{" "}
        <span className="editorial-underline">Google</span>,{" "}
        <span className="editorial-underline">Amazon</span>, and{" "}
        <span className="editorial-underline">Cair Health</span>!
      </p>
      <div className="sans mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
        <Link href={`mailto:${siteConfig.email}`} className="accent-link">
          {siteConfig.email}
        </Link>
        <Link
          href={siteConfig.links.github}
          className="accent-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        <Link
          href={siteConfig.links.linkedin}
          className="accent-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
        <Link
          href="/Garv_Goswami_Resume.pdf"
          className="accent-link"
          target="_blank"
        >
          Curriculum Vit&aelig;
        </Link>
      </div>
    </section>
  );
}
