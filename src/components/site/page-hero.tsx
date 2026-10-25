import type { ReactNode } from "react";

import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/** Compact hero for inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("honeycomb bg-cream", className)}>
      <div className="container-page py-14 md:py-20">
        <Reveal>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {intro}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/** Closing call-to-action band used near the end of pages. */
export function CtaBand({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="honeycomb-dark bg-surface-dark">
      <div className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-surface-dark-foreground md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-surface-dark-foreground/80 md:text-base">
            {body}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}
