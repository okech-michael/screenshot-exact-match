import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/page-hero";
import { SOLUTIONS, siteHeaderCta } from "@/lib/content";

export const Route = createFileRoute("/solutions/")({
  component: SolutionsIndex,
  head: () => ({
    meta: [
      { title: "Our Solutions — HiveNet" },
      {
        name: "description",
        content:
          "HiveNet's connectivity solutions: home internet, managed Wi-Fi for residential properties and plots, business and office internet, schools, healthcare facilities, and managed networking equipment.",
      },
      { property: "og:title", content: "Our Solutions — HiveNet" },
      {
        property: "og:description",
        content:
          "Internet and professionally managed Wi-Fi for homes, residential properties, businesses and institutions — equipment, installation and support included.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SolutionsIndex() {
  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Solutions
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              One provider for connectivity, equipment and support
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Every HiveNet service includes a proper assessment of your
              premises, professionally installed and configured equipment, and
              support you can actually reach. Choose the solution that fits
              your situation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page space-y-10">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.slug} delay={0.02 * i}>
              <article
                className={`grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>img]:order-2" : ""
                }`}
              >
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-7 md:p-9">
                  <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {s.short}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/solutions/$slug"
                      params={{ slug: s.slug }}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {s.name}
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure which solution fits?"
        body="Send us an enquiry describing your property and needs, and we will recommend the right arrangement — or check whether service is available at your location."
      >
        <Link
          to={siteHeaderCta.to}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {siteHeaderCta.label}
        </Link>
      </CtaBand>
    </SiteLayout>
  );
}
