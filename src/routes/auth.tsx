import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn } from "lucide-react";
import { useEffect, useState } from "react";

import { HiveNetLogo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    // Already signed in? Go straight to the dashboard.
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      throw redirect({ to: "/admin" });
    }
  },
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Staff Sign-In — HiveNet" },
      {
        name: "description",
        content: "HiveNet staff sign-in for the enquiry dashboard.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Keep the affordance honest: if a session appears (e.g. confirmation link),
  // move on instead of showing a stale sign-in form.
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        void navigate({ to: "/admin", replace: true });
      }
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setError("That email or password is not correct. Please try again.");
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
          <h1 className="text-lg font-bold text-foreground">Staff sign-in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            For HiveNet team members managing enquiries.
          </p>
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
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
