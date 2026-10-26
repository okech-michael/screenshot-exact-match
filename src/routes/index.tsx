import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { PackagesTable } from "@/components/site/packages-table";
import { CtaBand } from "@/components/site/page-hero";
import {
  HOW_IT_WORKS_STEPS,
  INDUSTRIES,
  SOLUTIONS,
  WHY_HIVENET,
  siteHeaderCta,
} from "@/lib/content";

// Home route inherits title/description/og/twitter from __root.tsx and ships
// no og:image (the hero image is a bundled asset, which resolves relative).
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="honeycomb bg-cream">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              HiveNet — internet and managed Wi-Fi
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Internet that keeps you connected.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              HiveNet delivers reliable internet connectivity and professionally
              managed Wi-Fi for homes, residential properties, businesses and
              institutions — with the equipment, installation and ongoing
              support handled by one accountable team.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={siteHeaderCta.to}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {siteHeaderCta.label}
              </Link>
              <Link
                to="/plans"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                See plans and pricing
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Serving homes, plots and apartments, offices, schools and
              healthcare facilities.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <img
              src="/images/hero-home.jpg"
              alt="A family relaxing in a bright modern living room using phones, tablets and a laptop"
              className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-md"
              loading="eager"
            />
          </Reveal>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Our solutions
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Connectivity for the places people live, work and learn
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold text-foreground">
                      {s.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-primary-deep">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why HiveNet */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Why households and organisations choose HiveNet
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

      {/* Plans teaser */}
      <section className="py-16 md:py-20">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Prepaid Wi-Fi packages
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Simple prepaid packages, from one hour to a month
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              HiveNet's prepaid Wi-Fi packages have fixed prices in Kenyan
              shillings. Dedicated home, property, business and institutional
              arrangements are quoted individually after we assess your
              requirements.
            </p>
            <Link
              to="/plans"
              className="mt-6 inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              View all plans
            </Link>
          </Reveal>
          <PackagesTable />
        </div>
      </section>

      {/* How it works */}
      <section className="honeycomb bg-cream py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              How it works
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              From your first enquiry to a working connection — a clear,
              five-step process.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <li className="h-full rounded-xl border border-border bg-card p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <Link
              to="/how-it-works"
              className="mt-8 inline-flex text-sm font-semibold text-primary-deep underline-offset-4 hover:underline"
            >
              Read the full process →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Who we serve
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.04}>
                <Link
                  to={ind.to as never}
                  className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {ind.name}
                  </span>
                  <span className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {ind.blurb}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to get connected?"
        body="Tell us about your home, property, business or institution and we will confirm availability, assess your requirements and send you a clear proposal."
      >
        <Link
          to={siteHeaderCta.to}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {siteHeaderCta.label}
        </Link>
        <Link
          to="/faq"
          className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-surface-dark-foreground transition-colors hover:bg-white/10"
        >
          Read the FAQ
        </Link>
      </CtaBand>
    </SiteLayout>
  );
}

