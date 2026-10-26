import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { PackagesTable } from "@/components/site/packages-table";
import { CtaBand } from "@/components/site/page-hero";
import { siteHeaderCta } from "@/lib/content";

export const Route = createFileRoute("/plans")({
  component: Plans,
  head: () => ({
    meta: [
      { title: "Plans and Pricing — HiveNet" },
      {
        name: "description",
        content:
          "HiveNet prepaid Wi-Fi packages, from KSh 5 for an hour to KSh 500 for a month. Dedicated home, property, business and institutional arrangements are quoted individually.",
      },
      { property: "og:title", content: "Plans and Pricing — HiveNet" },
      {
        property: "og:description",
        content:
          "Simple prepaid Wi-Fi packages in Kenyan shillings, plus individually quoted dedicated arrangements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Plans() {
  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Plans and pricing
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Prepaid packages and dedicated arrangements
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              HiveNet's prepaid Wi-Fi packages have fixed prices in Kenyan
              shillings, shown below. For homes, residential properties,
              businesses and institutions, we quote a dedicated arrangement
              after assessing your requirements.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <PackagesTable />
          <Reveal delay={0.08}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">
                Dedicated arrangements, quoted individually
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Pricing for home, property, business and institutional
                services depends on availability at your location, the
                coverage needed and the equipment required. That is why we
                assess first and quote second — the proposal you receive lists
                the service arrangement, equipment, pricing and terms clearly.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Home internet — quoted after a connectivity assessment.</li>
                <li>• Residential properties and plots — priced per property and number of units.</li>
                <li>• Business and office internet — based on premises, users and usage.</li>
                <li>• Schools and healthcare facilities — based on the campus or facility assessment.</li>
              </ul>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request a quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Ready to connect?"
        body="Submit an enquiry and we will confirm availability, assess your requirements and send a clear proposal."
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
