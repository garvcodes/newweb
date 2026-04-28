import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { ModeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b border-rule">
      <div className="container flex w-full items-center justify-between py-5">
        <Logo />
        <div className="flex items-center gap-6">
          <MainNav />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
