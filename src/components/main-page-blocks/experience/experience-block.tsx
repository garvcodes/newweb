import { awards, education, industryRoles, researchRoles, type Role } from "@/data/resume";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";

function RoleEntry({ role }: { role: Role }) {
  return (
    <article className="grid gap-3 border-t border-rule py-7 md:grid-cols-[10rem_1fr] md:gap-8">
      <div className="sans text-sm text-muted-foreground">
        <p>{role.date}</p>
        <p className="mt-0.5 italic">{role.location}</p>
      </div>
      <div>
        <h3 className="serif text-h-item leading-snug">
          <span className="font-semibold">{role.title}</span>
          <span className="text-muted-foreground"> &middot; {role.organization}</span>
        </h3>
        {role.bullets.length > 0 && (
          <ul className="mt-3 space-y-2 sans text-[15px] leading-relaxed text-foreground/85">
            {role.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-[0.55rem] inline-block h-px w-3 shrink-0 bg-[hsl(var(--accent-color))]"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
        {role.skills && role.skills.length > 0 && (
          <p className="mt-3 sans text-xs uppercase tracking-wider text-muted-foreground">
            {role.skills.join(" / ")}
          </p>
        )}
      </div>
    </article>
  );
}

export function ExperienceBlock() {
  return (
    <section className="container py-16 md:py-24" id="experience">
      <SectionHeader eyebrow="i." title="Education" />
      <div className="mt-6">
        <RoleEntry role={education} />
      </div>

      {awards.length > 0 && (
        <div className="mt-8 grid gap-3 md:grid-cols-[10rem_1fr] md:gap-8">
          <p className="small-caps sans text-xs text-muted-foreground">Awards</p>
          <ul className="space-y-3">
            {awards.map((award) => (
              <li key={award.title} className="sans text-[15px] leading-relaxed text-foreground/85">
                <span className="font-semibold">
                  {award.link ? (
                    <Link
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[hsl(var(--accent-color))]"
                    >
                      {award.title}
                    </Link>
                  ) : (
                    award.title
                  )}
                </span>
                <span className="text-muted-foreground">
                  {" "}&middot; {award.organization} &middot; {award.date}
                </span>
                {award.description && (
                  <p className="mt-1 text-[14px] text-foreground/75">{award.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-20">
        <SectionHeader eyebrow="ii." title="Industry Experience" />
        <div className="mt-6">
          {industryRoles.map((role) => (
            <RoleEntry key={role.organization + role.date} role={role} />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <SectionHeader eyebrow="iii." title="Research Experience" />
        <div className="mt-6">
          {researchRoles.map((role) => (
            <RoleEntry key={role.organization + role.date} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
