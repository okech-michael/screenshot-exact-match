import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — HiveNet" },
      {
        name: "description",
        content:
          "How HiveNet collects, uses and protects the personal information you provide through the website enquiry forms.",
      },
      { property: "og:title", content: "Privacy Policy — HiveNet" },
      {
        property: "og:description",
        content: "How HiveNet handles the personal information you provide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Privacy() {
  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Legal
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
              This policy explains what information {siteConfig.name} collects
              through this website, why we collect it, and how it is handled.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-3xl space-y-10">
          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              Information we collect
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                When you submit an enquiry, we collect the details you provide:
                your name, phone number, optional email address, your location
                (county, town and estate), the type of premises, how you
                prefer to be contacted, and a description of what you need.
              </p>
              <p>
                We collect only what is needed to respond to your enquiry and
                prepare an assessment or proposal. We do not collect payment
                details through this website.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              How we use your information
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Your information is used to respond to your enquiry, confirm
                service availability at your location, contact you through
                your preferred channel, and prepare quotations and proposals.
              </p>
              <p>
                Enquiry details may be shared within the HiveNet team and with
                the technicians assigned to assess or install at your
                premises. We do not sell your personal information, and we do
                not use it to send unrelated marketing.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              How long we keep it
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Enquiry records are retained for as long as needed to handle
              your enquiry and any resulting service, and for reasonable
              record-keeping afterwards. You may ask us to update or remove
              your enquiry details at any time.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              Your choices
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              You can choose how we contact you (phone, WhatsApp or email) and
              the best time to reach you. Submitting an enquiry is voluntary —
              you decide what to share. To review, correct or delete the
              details you submitted, contact us through the{" "}
              <Link to="/contact" className="font-medium text-primary-deep underline underline-offset-2">
                enquiry form
              </Link>{" "}
              and quote your enquiry reference.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              Changes to this policy
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If this policy changes, the updated version will be published on
              this page.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
