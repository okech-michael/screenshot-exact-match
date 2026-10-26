import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/page-hero";
import { WHY_HIVENET, siteHeaderCta } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About HiveNet" },
      {
        name: "description",
        content:
          "HiveNet provides internet connectivity and professionally managed Wi-Fi — including equipment, installation and ongoing support — for homes, properties, businesses and institutions.",
      },
      { property: "og:title", content: "About HiveNet" },
      {
        property: "og:description",
        content:
          "One accountable partner for connectivity, equipment, installation and support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function About() {
  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              About us
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {siteConfig.name} — {siteConfig.tagline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {siteConfig.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              What we do
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                HiveNet provides internet connectivity and managed Wi-Fi as a
                complete service. We assess your location and premises, supply
                the routers and access points the service requires, install
                and configure everything professionally, and remain available
                for support afterwards.
              </p>
              <p>
                We serve single homes and bedsitters as well as entire plots
                and apartment blocks with shared, centrally managed networks.
                Offices, shops and hospitality venues get connectivity planned
                around how the business works, and schools and healthcare
                facilities receive campus-wide assessments before any
                installation is proposed.
              </p>
              <p>
                Prepaid Wi-Fi packages with fixed prices serve individual
                users on the HiveNet Wi-Fi service, while dedicated home,
                property, business and institutional arrangements are quoted
                individually after assessment.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              How we work
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Every HiveNet engagement follows the same shape: an enquiry, an
                assessment of your requirements, a clear written proposal, and
                professional installation and configuration once you agree.
                We only promise what we can confirm for your location —
                availability, coverage and pricing are established during the
                assessment, not assumed.
              </p>
              <p>
                Our relationship with you does not end at installation. We
                stay reachable through our support channels, review coverage
                as your needs change, and can add access points or adjust
                service arrangements over time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-14 md:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              What HiveNet stands for
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_HIVENET.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-border bg-card p-6">
                  <div className="h-1.5 w-10 rounded-full bg-primary" />
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {w.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's find the right arrangement for you"
        body="Whether it's one room, a whole building or an entire campus, it starts with a short enquiry."
      >
        <Link
          to={siteHeaderCta.to}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {siteHeaderCta.label}
        </Link>
        <Link
          to="/how-it-works"
          className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-surface-dark-foreground transition-colors hover:bg-white/10"
        >
          How it works
        </Link>
      </CtaBand>
    </SiteLayout>
  );
}
