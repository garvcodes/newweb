import Link from "next/link";

const navItems = [
  { name: "Experience", href: "/#experience" },
  { name: "Research", href: "/#research" },
  { name: "Projects", href: "/#hackathons" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export function MainNav() {
  return (
    <nav className="hidden items-center gap-7 sans text-sm md:flex">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className="text-muted-foreground transition-colors hover:text-[hsl(var(--accent-color))]"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
