import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/page-hero";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { SOLUTIONS, getSolution, siteHeaderCta } from "@/lib/content";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    if (!getSolution(params.slug)) {
      throw notFound();
    }
  },
  component: SolutionDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Solution not found
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            The solution you're looking for doesn't exist.
          </p>
          <Link
            to="/solutions"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Browse all solutions
          </Link>
        </div>
      </section>
    </SiteLayout>
  ),
  head: ({ params }) => {
    const solution = getSolution(params.slug);
    return {
      meta: solution
        ? [
            { title: `${solution.name} — HiveNet Solutions` },
            { name: "description", content: solution.short },
            { property: "og:title", content: `${solution.name} — HiveNet` },
            { property: "og:description", content: solution.short },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
          ]
        : [
            { title: "Solution unavailable — HiveNet" },
            { name: "robots", content: "noindex" },
          ],
    };
  },
});

function SolutionDetail() {
  const { slug } = Route.useParams();
  const solution = getSolution(slug)!;
  const others = SOLUTIONS.filter((s) => s.slug !== slug);

  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              HiveNet solutions
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {solution.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {solution.intro}
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {solution.cta.label}
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={solution.image}
              alt={solution.imageAlt}
              className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-md"
            />
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                What's included
              </h2>
              <ul className="mt-5 space-y-3">
                {solution.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-lg border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                {solution.note}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Other solutions
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    to="/solutions/$slug"
                    params={{ slug: o.slug }}
                    className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/50"
                  >
                    {o.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {solution.cta.label}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in the form and we will get back to you. Your enquiry goes
                straight to the HiveNet team.
              </p>
              <div className="mt-6">
                <EnquiryForm defaultCategory={solution.cta.category} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer to talk first?"
        body="Submit a coverage enquiry with your county, town and estate, and we will confirm what is possible at your location before anything else."
      >
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {siteHeaderCta.label}
        </Link>
      </CtaBand>
    </SiteLayout>
  );
}
