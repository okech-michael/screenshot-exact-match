import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";

/**
 * Integration-managed gate for the staff-only area. Runs client-side only:
 * the session lives in browser storage, which SSR cannot read.
 */
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw redirect({ to: "/auth" });
    }
    return { userId: user.id, email: user.email ?? "" };
  },
  component: () => <Outlet />,
});
