import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { PREPAID_PACKAGES } from "@/lib/content";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
function lastRouteId(path: string): string | undefined {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  return router.matchRoutes(path).at(-1)?.routeId;
}

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    expect(lastRouteId("/")).not.toBe(rootRouteId);
  });

  it("matches the public marketing pages", () => {
    for (const path of [
      "/solutions",
      "/solutions/home-internet",
      "/industries",
      "/how-it-works",
      "/about",
      "/plans",
      "/faq",
      "/contact",
      "/privacy",
      "/terms",
    ]) {
      expect(lastRouteId(path), path).not.toBe(rootRouteId);
    }
  });

  it("matches the staff sign-in page", () => {
    expect(lastRouteId("/auth")).toBe("/auth");
  });

  it("protects the enquiry dashboard behind the authenticated gate", () => {
    // /admin must resolve to the _authenticated/admin route, not a public page.
    expect(lastRouteId("/admin")).toBe("/_authenticated/admin");
  });
});

describe("Confirmed prepaid pricing", () => {
  it("shows the agreed HiveNet prepaid package prices in KSh", () => {
    expect(PREPAID_PACKAGES.map((p) => p.price)).toEqual([5, 10, 15, 20, 35, 170, 500]);
    expect(PREPAID_PACKAGES.map((p) => p.duration)).toEqual([
      "1 Hour",
      "2 Hours",
      "4 Hours",
      "6 Hours",
      "24 Hours",
      "7 Days",
      "30 Days",
    ]);
  });
});
