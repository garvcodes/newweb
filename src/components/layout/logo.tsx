import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="serif text-lg font-medium tracking-tight transition-colors hover:text-[hsl(var(--accent-color))] md:text-xl"
      aria-label="Home"
    >
      Garv Goswami
    </Link>
  );
}
