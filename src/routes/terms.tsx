import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of Service — HiveNet" },
      {
        name: "description",
        content:
          "The terms that apply to HiveNet enquiries, prepaid Wi-Fi packages and dedicated connectivity services.",
      },
      { property: "og:title", content: "Terms of Service — HiveNet" },
      {
        property: "og:description",
        content: "Terms for HiveNet enquiries, prepaid packages and services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Terms() {
  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Legal
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
              These terms describe how enquiries, prepaid packages and
              dedicated {siteConfig.name} services work. Specific agreements
              always take precedence over this summary.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-3xl space-y-10">
          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              Enquiries and proposals
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Submitting an enquiry does not create a service commitment.
              Service availability, coverage, equipment and pricing are
              confirmed through our assessment process, and the written
              proposal you receive states the exact arrangement, pricing and
              terms for your location.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              Prepaid Wi-Fi packages
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Prepaid packages are bought and used directly on the HiveNet
              Wi-Fi service at the fixed prices shown on the{" "}
              <Link to="/plans" className="font-medium text-primary-deep underline underline-offset-2">
                plans page
              </Link>
              . A package is active for the duration shown at purchase.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              Dedicated services and equipment
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For dedicated home, property, business and institutional
              services, the equipment required is supplied and managed by
              HiveNet as part of the service arrangement. Equipment ownership
              and return terms for a particular agreement are confirmed during
              quotation and contracting. HiveNet supports equipment it supplies
              and manages; the support arrangements are stated in your
              agreement.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              Fair use of this website
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Please use the enquiry forms genuinely — they are for real
              connection requests and questions. We limit repeated submissions
              from the same phone number to keep response times fair for
              everyone.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">
              Questions about these terms
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If anything is unclear, contact us through the{" "}
              <Link to="/contact" className="font-medium text-primary-deep underline underline-offset-2">
                enquiry form
              </Link>{" "}
              before entering into a service agreement.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
