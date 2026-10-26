import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/page-hero";
import { HOW_IT_WORKS_STEPS, siteHeaderCta } from "@/lib/content";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorks,
  head: () => ({
    meta: [
      { title: "How It Works — HiveNet" },
      {
        name: "description",
        content:
          "From enquiry to connection: how HiveNet assesses your requirements, sends a clear proposal, installs and configures your equipment, and supports you afterwards.",
      },
      { property: "og:title", content: "How It Works — HiveNet" },
      {
        property: "og:description",
        content:
          "Enquire, get an assessment, receive a proposal, get installed, stay connected — the HiveNet process.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function HowItWorks() {
  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              How it works
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              A clear process from first enquiry to working connection
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              No guesswork, no pressure. You tell us what you need, we assess
              your requirements properly, and you receive a proposal you can
              review before anything is installed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-3xl">
          <ol className="space-y-8">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="flex gap-5">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="border-b border-border pb-8">
                    <h2 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-xl border border-border bg-surface p-6">
              <h2 className="text-base font-semibold text-foreground">
                What helps us move faster
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Your county, town or area — so we can confirm service availability.</li>
                <li>• The type of premises: house, plot, apartment block, office, school or facility.</li>
                <li>• Roughly how many people will use the connection.</li>
                <li>• What matters most to you: speed of installation, coverage, or budget.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Start with a short enquiry"
        body="A few details are enough for us to check availability and prepare an assessment of your requirements."
      >
        <Link
          to={siteHeaderCta.to}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {siteHeaderCta.label}
        </Link>
        <Link
          to="/plans"
          className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-surface-dark-foreground transition-colors hover:bg-white/10"
        >
          See prepaid packages
        </Link>
      </CtaBand>
    </SiteLayout>
  );
}
