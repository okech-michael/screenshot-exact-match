import { createFileRoute } from "@tanstack/react-router";

const BOOTSTRAP_TOKEN = "hDpZxPGbevmkDSeHkO8zc_s09h0pGRL8YodPmwXzNg3vC3d-";
const STAFF_EMAIL = "ceo@terraseptsolutions.com";

export const Route = createFileRoute("/api/public/staff-bootstrap")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (request.headers.get("authorization") !== `Bearer ${BOOTSTRAP_TOKEN}`) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: userList, error: lookupError } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 1000,
        });
        if (lookupError) {
          console.error("[staff-bootstrap] account lookup failed");
          return Response.json({ error: "Staff setup could not be completed." }, { status: 502 });
        }

        const existingUser = userList.users.find(
          (user) => user.email?.toLowerCase() === STAFF_EMAIL,
        );
        const redirectTo = new URL("/auth/complete", request.url).toString();
        let userId: string;

        if (existingUser) {
          userId = existingUser.id;
        } else {
          const { data: invited, error: inviteError } =
            await supabaseAdmin.auth.admin.inviteUserByEmail(STAFF_EMAIL, { redirectTo });
          if (inviteError || !invited.user) {
            console.error("[staff-bootstrap] invitation could not be sent");
            return Response.json({ error: "Staff setup could not be completed." }, { status: 502 });
          }
          userId = invited.user.id;
        }

        const { error: roleError } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
        if (roleError) {
          console.error("[staff-bootstrap] admin role could not be assigned");
          return Response.json({ error: "Staff setup could not be completed." }, { status: 500 });
        }

        if (existingUser) {
          const { error: resetError } = await supabaseAdmin.auth.resetPasswordForEmail(STAFF_EMAIL, {
            redirectTo,
          });
          if (resetError) {
            console.error("[staff-bootstrap] password setup email could not be sent");
            return Response.json({ error: "Staff setup could not be completed." }, { status: 502 });
          }
        }

        return Response.json({ ok: true, invitationSent: !existingUser });
      },
    },
  },
});