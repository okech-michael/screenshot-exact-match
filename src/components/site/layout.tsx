import { Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SiteFooter } from "./footer";
import { SiteHeader } from "./header";

/** Shared shell for every public page: header, content, footer. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export { Outlet };
