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
        Student at UC Berkeley, learning my way around{" "}
        <span className="italic text-[hsl(var(--accent-color))]">
          machine learning
        </span>{" "}
        and the{" "}
        <span className="italic text-[hsl(var(--accent-color))]">
          life sciences
        </span>
        .
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sans">
        I&rsquo;m an undergrad in CS, mostly just trying to be useful and keep
        learning. Along the way I&rsquo;ve been lucky to work as a machine
        learning intern at{" "}
        <span className="text-foreground">Phare Bio</span> and as a student
        researcher in the{" "}
        <span className="text-foreground">Ronda Lab</span> at the Innovative
        Genomics Institute, where I help out on generative models for protein
        and small-molecule design.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm sans">
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
        <Link href="/Garv_Resume.pdf" className="accent-link" target="_blank">
          Curriculum Vit&aelig;
        </Link>
      </div>
    </section>
  );
}
