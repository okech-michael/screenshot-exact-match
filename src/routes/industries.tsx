import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/page-hero";
import { INDUSTRIES, siteHeaderCta } from "@/lib/content";

export const Route = createFileRoute("/industries")({
  component: Industries,
  head: () => ({
    meta: [
      { title: "Who We Serve — HiveNet" },
      {
        name: "description",
        content:
          "HiveNet serves homes, apartments and residential plots, offices and businesses, retail and hospitality, schools, hospitals and other organisations with managed internet and Wi-Fi.",
      },
      { property: "og:title", content: "Who We Serve — HiveNet" },
      {
        property: "og:description",
        content:
          "Connectivity for homes, properties, businesses, schools, healthcare facilities and other organisations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Industries() {
  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Industries
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Different premises, one standard of service
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A bedsitter, an apartment block, an office floor and a school
              campus have very different needs. HiveNet assesses each location
              on its own terms and plans coverage around the people who will
              actually use it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.04}>
              <Link
                to={ind.to as never}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="h-1.5 w-10 rounded-full bg-primary" />
                <h2 className="mt-4 text-base font-semibold text-foreground">
                  {ind.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {ind.blurb}
                </p>
                <span className="mt-4 text-sm font-semibold text-primary-deep">
                  See the solution →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Your organisation not on the list?"
        body="Churches, community centres, NGOs and other organisations with multiple rooms, buildings or users are welcome too — send us an enquiry and we will assess your requirements."
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
