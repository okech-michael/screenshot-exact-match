import { Link, createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Wifi, Wrench } from "lucide-react";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { PackagesTable } from "@/components/site/packages-table";
import { CtaBand } from "@/components/site/page-hero";
import heroVideoAsset from "@/assets/videos/hivenet-hero-background.mp4.asset.json";
import {
  HOW_IT_WORKS_STEPS,
  INDUSTRIES,
  SOLUTIONS,
  WHY_HIVENET,
  siteHeaderCta,
} from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "HiveNet — Internet and managed Wi-Fi for homes and organisations",
      },
      {
        name: "description",
        content:
          "Reliable internet connectivity and professionally managed Wi-Fi for homes, residential properties, businesses and institutions — equipment, installation and ongoing support from one accountable team.",
      },
      {
        property: "og:title",
        content: "HiveNet — Internet and managed Wi-Fi for homes and organisations",
      },
      {
        property: "og:description",
        content:
          "Reliable internet and professionally managed Wi-Fi for homes, properties, businesses and institutions — equipment, installation and support from one accountable team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PROMISES = [
  {
    icon: Wifi,
    title: "We supply the equipment",
    body: "Routers and access points selected, provided and managed by HiveNet.",
  },
  {
    icon: Wrench,
    title: "Professional installation",
    body: "Coverage planned around your rooms, units or campus — then installed properly.",
  },
  {
    icon: LifeBuoy,
    title: "One accountable team",
    body: "A single team handles the connection, the equipment and ongoing support.",
  },
] as const;

function Index() {
  return (
    <SiteLayout>
      {/* Cinematic video hero */}
      <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-surface-dark">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero-home.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover"
            src={heroVideoAsset.url}
            poster="/images/hero-home.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/70 to-surface-dark/35" />
          <div className="honeycomb-dark absolute inset-0 opacity-50" />
        </div>

        <div className="container-page pb-16 pt-36 md:pb-24 md:pt-44">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              HiveNet — internet and managed Wi-Fi
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-surface-dark-foreground md:text-6xl">
              Internet that keeps you connected.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-surface-dark-foreground/80 md:text-lg">
              For homes, residential properties, businesses and institutions —
              with the equipment, installation and ongoing support handled by
              one accountable team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={siteHeaderCta.to}
                className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/20 transition-colors hover:bg-primary/90"
              >
                {siteHeaderCta.label}
              </Link>
              <Link
                to="/plans"
                className="inline-flex items-center justify-center rounded-md border border-surface-dark-foreground/30 bg-surface-dark/30 px-7 py-3.5 text-sm font-semibold text-surface-dark-foreground backdrop-blur transition-colors hover:border-surface-dark-foreground/60 hover:bg-surface-dark/50"
              >
                See plans and pricing
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-3 text-sm text-surface-dark-foreground/70">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Homes, plots and apartments · Offices · Schools · Healthcare
            </p>
          </Reveal>
        </div>
      </section>

      {/* Promise strip */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid gap-8 py-10 sm:grid-cols-3 md:py-12">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream text-primary-deep">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    {p.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Solutions — asymmetric bento */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Our solutions
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              Connectivity for the places people live, work and learn
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal
                key={s.slug}
                delay={Math.min(i, 2) * 0.05}
                className={i === 0 ? "lg:col-span-2 lg:row-span-2" : undefined}
              >
                <Link
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
                >
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    className={
                      i === 0
                        ? "aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        : "aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    }
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3
                      className={
                        i === 0
                          ? "text-xl font-semibold text-foreground"
                          : "text-base font-semibold text-foreground"
                      }
                    >
                      {s.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep">
                      Learn more
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why HiveNet — dark cinematic band */}
      <section className="honeycomb-dark bg-surface-dark py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Why HiveNet
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-surface-dark-foreground md:text-4xl">
              What households and organisations count on
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-surface-dark-foreground/15 bg-surface-dark-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_HIVENET.map((w, i) => (
              <div key={w.title} className="bg-surface-dark p-6">
                <span className="text-sm font-bold tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-surface-dark-foreground">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-surface-dark-foreground/75">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans teaser */}
      <section className="py-16 md:py-24">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Prepaid Wi-Fi packages
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-4xl">
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
      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              How it works
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              From your first enquiry to a working connection — a clear,
              five-step process.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <li className="relative flex h-full flex-col rounded-xl border border-border bg-card p-5">
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
      <section className="py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              Who we serve
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={Math.min(i, 3) * 0.04}>
                <Link
                  to={ind.to as never}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-accent/40"
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
