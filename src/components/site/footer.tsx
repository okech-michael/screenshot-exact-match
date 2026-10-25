import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { HiveNetLogo } from "./logo";
import { footerLinks, copyrightNotice } from "@/lib/content";
import { contactConfigured, siteConfig } from "@/lib/site-config";


function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ name: string; to: string }>;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.name}`}>
            <Link
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { contact, hours } = siteConfig;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <HiveNetLogo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <LinkColumn title="Solutions" links={footerLinks.solutions} />
        <LinkColumn title="Who we serve" links={footerLinks.industries} />

        <div>
          <h3 className="text-sm font-semibold text-foreground">HiveNet</h3>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {contactConfigured(contact) && (
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {contact.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary-deep" />
                  <a href={`tel:${contact.phone}`} className="hover:text-foreground">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary-deep" />
                  <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-deep" />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>{copyrightText()}</p>
          <div className="flex gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function copyrightText() {
  return copyrightNotice();
}

