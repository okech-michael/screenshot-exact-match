import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { HiveNetLogo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/complete")({
  ssr: false,
  component: CompleteStaffSetup,
  head: () => ({
    meta: [
      { title: "Finish Staff Setup — HiveNet" },
      {
        name: "description",
        content: "Set a password to finish setting up HiveNet staff access.",
      },
      { property: "og:title", content: "Finish Staff Setup — HiveNet" },
      {
        property: "og:description",
        content: "Set a password to finish setting up HiveNet staff access.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function CompleteStaffSetup() {
  const navigate = useNavigate();
  const [sessionReady, setSessionReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setHasSession(Boolean(session));
      setSessionReady(true);
    });

    void supabase.auth.getSession().then(({ data: sessionData }) => {
      if (!mounted) return;
      setHasSession(Boolean(sessionData.session));
      setSessionReady(true);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }
    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError("Your password could not be saved. Open a fresh invitation link and try again.");
      setSubmitting(false);
      return;
    }

    await navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <HiveNetLogo className="mx-auto h-8" />
        <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Finish staff setup</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a password for your HiveNet dashboard access.
          </p>

          {!sessionReady ? (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground" role="status">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking your invitation…
            </div>
          ) : !hasSession ? (
            <div className="mt-6 space-y-4">
              <p className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted-foreground" role="alert">
                This invitation link is missing or has expired. Open the latest link from your email.
              </p>
              <Link to="/auth" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                Return to staff sign-in
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                >
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Save password and continue
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}