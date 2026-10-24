import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * HiveNet wordmark: a gold hexagon mark with a darker honeycomb core,
 * paired with the company name.
 */
export function HiveNetLogo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="HiveNet home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 40 44"
        className="h-8 w-auto shrink-0"
        role="img"
        aria-hidden="true"
      >
        <path
          d="M20 1.5 37.5 11.75v20.5L20 42.5 2.5 32.25v-20.5Z"
          fill="var(--color-primary)"
        />
        <path
          d="M20 10.5 29.5 16v11L20 32.5 10.5 27V16Z"
          fill="var(--color-primary-deep)"
        />
        <circle cx="20" cy="21.5" r="3.2" fill="var(--color-primary)" />
      </svg>
      <span className="text-xl font-bold tracking-tight text-foreground">
        Hive<span className="text-primary">Net</span>
      </span>
    </Link>
  );
}
