import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { contactConfigured, siteConfig } from "@/lib/site-config";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact HiveNet — Get Connected" },
      {
        name: "description",
        content:
          "Get in touch with HiveNet: send an enquiry about home internet, residential properties, business connectivity, schools, healthcare facilities or coverage availability.",
      },
      { property: "og:title", content: "Contact HiveNet — Get Connected" },
      {
        property: "og:description",
        content:
          "Send an enquiry and the HiveNet team will confirm availability, assess your requirements and send a proposal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Contact() {
  const { contact, hours } = siteConfig;
  const configured = contactConfigured();

  return (
    <SiteLayout>
      <section className="honeycomb bg-cream">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
              Contact
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Get connected — tell us what you need
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Fill in the enquiry form below and the HiveNet team will get back
              to you. Whether it's a single room, a whole property, a business
              or an institution, a short enquiry is enough to start.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <EnquiryForm defaultCategory="general" />
          </div>
          <div className="space-y-6">
            <Reveal delay={0.08}>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-base font-semibold text-foreground">
                  What happens next
                </h2>
                <ol className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                  <li>1. We receive your enquiry with a reference number.</li>
                  <li>2. We confirm service availability at your location.</li>
                  <li>3. We assess your requirements — a site visit if needed.</li>
                  <li>4. You receive a clear proposal with pricing and terms.</li>
                </ol>
              </div>
            </Reveal>

            {configured && (
              <Reveal delay={0.12}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-foreground">
                    Reach us directly
                  </h2>
                  <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                    {contact.phone && (
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary-deep" />
                        <a href={`tel:${contact.phone}`} className="hover:text-foreground">
                          {contact.phone}
                        </a>
                      </li>
                    )}
                    {(contact.whatsapp as string) && (
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary-deep" />
                        <a
                          href={`https://wa.me/${(contact.whatsapp as string).replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-foreground"
                        >
                          WhatsApp us

                        </a>
                      </li>
                    )}
                    {contact.email && (
                      <li className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary-deep" />
                        <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                          {contact.email}
                        </a>
                      </li>
                    )}
                    {contact.address && (
                      <li className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep" />
                        <span>{contact.address}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </Reveal>
            )}

            {(hours.weekdays || hours.weekends) && (
              <Reveal delay={0.16}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-foreground">
                    Office hours
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {hours.weekdays && <li>{hours.weekdays}</li>}
                    {hours.weekends && <li>{hours.weekends}</li>}
                  </ul>
                </div>
              </Reveal>
            )}

            {!configured && (
              <Reveal delay={0.12}>
                <p className="rounded-lg border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  The fastest way to reach HiveNet is the enquiry form. Phone,
                  email and office details are shown here once they are
                  confirmed.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
