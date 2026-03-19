"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AuthForm } from "@/components/auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  async function handleSignup(email: string, password: string) {
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setConfirmedEmail(email);
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-foreground">
              check your email
            </CardTitle>
            <CardDescription>
              we sent a confirmation link to <strong>{confirmedEmail}</strong>.
              click the link to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/login"
              className="inline-block text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              back to sign in
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSignup}
      error={error}
      loading={loading}
    />
  );
}
