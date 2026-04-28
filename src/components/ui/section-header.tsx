export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="serif text-base italic text-[hsl(var(--accent-color))]">
        {eyebrow}
      </span>
      <h2 className="serif text-3xl font-medium tracking-tight md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
