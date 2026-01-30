import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, SunMedium, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const links = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/tech", label: "Tech" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems = useMemo(
    () =>
      links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring"
          activeClassName="text-foreground"
          onClick={() => setOpen(false)}
        >
          {l.label}
        </NavLink>
      )),
    [],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mt-4 rounded-2xl border glass shadow-soft">
          <div className="flex items-center justify-between px-4 py-3">
            <a href="/" className="group inline-flex items-center gap-2 rounded-md px-2 py-1 focus-ring">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                <SunMedium className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-tight">OptiSol</span>
                <span className="block text-xs text-muted-foreground">Smarter Cooling, Higher Solar Output.</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">{navItems}</nav>

            <div className="hidden items-center gap-2 md:flex">
              <a href="/dashboard" className="focus-ring rounded-md">
                <Button variant="glass" size="sm" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Demo
                </Button>
              </a>
              <a href="/contact" className="focus-ring rounded-md">
                <Button variant="hero" size="sm">
                  Talk to us
                </Button>
              </a>
            </div>

            <button
              className={cn(
                "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border glass shadow-soft transition-transform active:scale-[0.98] focus-ring",
                open && "shadow-glow",
              )}
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className={cn("md:hidden overflow-hidden", open ? "max-h-96" : "max-h-0")}> 
            <div className="px-4 pb-4">
              <div className="grid gap-1 rounded-xl border bg-background/60 p-2">
                {navItems}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <a href="/dashboard" className="focus-ring rounded-md">
                    <Button variant="glass" size="sm" className="w-full">
                      Dashboard
                    </Button>
                  </a>
                  <a href="/contact" className="focus-ring rounded-md">
                    <Button variant="hero" size="sm" className="w-full">
                      Contact
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
