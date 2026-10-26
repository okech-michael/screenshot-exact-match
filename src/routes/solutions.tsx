import { Outlet, createFileRoute } from "@tanstack/react-router";

// Layout for the solutions section; the overview lives in solutions.index.tsx
// and each solution page in solutions.$slug.tsx.
export const Route = createFileRoute("/solutions")({
  component: () => <Outlet />,
});
