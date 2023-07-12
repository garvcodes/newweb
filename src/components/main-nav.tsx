import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/utils";
import { Icons } from "@/components/icons";

const navItems = [
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "About",
    href: "/about",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.links.github,
    icon: <Icons.gitHub className="h-6 w-6" />,
  },
  {
    name: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: <Icons.linkedIn className="h-6 w-6" />,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="container relative flex w-full items-center justify-between py-10">
      <div className="flex-1">
        <Link href="/" className="w-fit ">
          <p className="group w-fit whitespace-nowrap text-heading-m lowercase transition-colors hover:text-light-green">
            {siteConfig.logo}
            <span className="text-light-green transition-colors group-hover:text-foreground">
              .com
            </span>
          </p>
        </Link>
      </div>
      <nav className=" flex flex-1 items-center justify-center text-base font-medium">
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex flex-1 justify-end gap-10">
        {socialLinks.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className="transition-colors hover:text-light-green"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
