import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/page-hero";
import { FAQS, siteHeaderCta } from "@/lib/content";

export const Route = createFileRoute("/faq")({
  component: Faq,
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — HiveNet" },
      {
        name: "description",
        content:
          "Answers about HiveNet's service areas, equipment, installation, pricing, and how to request a connection or support.",
      },
      { property: "og:title", content: "Frequently Asked Questions — HiveNet" },
      {
        property: "og:description",
        content:
          "Answers about service areas, equipment, installation, pricing and support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Faq() {
  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              FAQ
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Frequently asked questions
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              If your question isn't answered here, send us an enquiry and
              we'll respond directly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-3xl">
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.03}>
                <details className="group rounded-xl border border-border bg-card p-5 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground md:text-base">
                    {faq.q}
                    <span className="text-primary-deep transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Still have a question?"
        body="Send us an enquiry with your county, town and what you want to connect, and we will answer with what applies to your location."
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
