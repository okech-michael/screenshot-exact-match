import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Reveal } from "./reveal";
import { PREPAID_PACKAGES } from "@/lib/content";

/**
 * HiveNet's confirmed prepaid Wi-Fi packages. Prices come from content.ts —
 * never invent or adjust a price here.
 */
export function PackagesTable() {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <caption className="sr-only">
            HiveNet prepaid Wi-Fi packages and prices in Kenyan shillings
          </caption>
          <thead>
            <tr className="border-b border-border bg-surface text-left">
              <th scope="col" className="px-5 py-3 font-semibold text-foreground">
                Package
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold text-foreground">
                Price (KSh)
              </th>
            </tr>
          </thead>
          <tbody>
            {PREPAID_PACKAGES.map((pkg) => (
              <tr key={pkg.duration} className="border-b border-border last:border-0">
                <td className="px-5 py-3.5 font-medium text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-deep" />
                    {pkg.duration}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right font-semibold text-foreground">
                  {pkg.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Prepaid packages are bought and used directly on the HiveNet Wi-Fi service.{" "}
        <Link to="/contact" className="font-medium text-primary-deep underline-offset-2 hover:underline">
          Talk to us
        </Link>{" "}
        for dedicated home, property, business and institutional arrangements.
      </p>
    </Reveal>
  );
}
