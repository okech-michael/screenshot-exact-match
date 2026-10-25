import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { HiveNetLogo } from "./logo";
import { NAV_LINKS, SOLUTIONS_DROPDOWN, siteHeaderCta } from "@/lib/content";
import { cn } from "@/lib/utils";

function SolutionsMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/80"
        aria-haspopup="true"
      >
        Solutions
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-[26rem] -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="grid grid-cols-1 gap-1 rounded-xl border border-border bg-popover p-2 shadow-lg">
          {SOLUTIONS_DROPDOWN.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
            >
              <span className="block text-sm font-medium text-foreground">
                {item.name}
              </span>
              <span className="mt-0.5 block line-clamp-2 text-xs text-muted-foreground">
                {item.short}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        scrolled ? "border-border" : "border-transparent",
        className,
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <HiveNetLogo />

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) =>
            link.to === "/solutions" ? (
              <SolutionsMenu key={link.to} />
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/80 [&.active]:text-primary-deep [&.active]:font-semibold"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Link
            to={siteHeaderCta.to}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {siteHeaderCta.label}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground"
            >
              Home
            </Link>
            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Solutions
            </p>
            {SOLUTIONS_DROPDOWN.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-foreground/90"
              >
                {item.name}
              </Link>
            ))}
            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Company
            </p>
            {NAV_LINKS.filter((l) => l.to !== "/" && l.to !== "/solutions").map(
              (link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to={siteHeaderCta.to}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              {siteHeaderCta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
