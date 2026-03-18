"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { signInWithGoogle } from "@/lib/auth";

type AuthFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  loadingLabel: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  googleLabel: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  error: string | null;
  loading: boolean;
  passwordMinLength?: number;
};

export function AuthForm({
  title,
  description,
  submitLabel,
  loadingLabel,
  onSubmit,
  googleLabel,
  footerText,
  footerLinkText,
  footerLinkHref,
  error,
  loading,
  passwordMinLength,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleError, setGoogleError] = useState<string | null>(null);

  const displayError = error || googleError;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGoogleError(null);
    await onSubmit(email, password);
  }

  async function handleGoogle() {
    setGoogleError(null);
    const supabase = createClient();
    await signInWithGoogle(supabase, setGoogleError);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {displayError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {displayError}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={passwordMinLength}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  passwordMinLength
                    ? `at least ${passwordMinLength} characters`
                    : "your password"
                }
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? loadingLabel : submitLabel}
            </Button>
          </form>

          <div className="relative flex items-center">
            <Separator className="flex-1" />
            <span className="px-3 text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            onClick={handleGoogle}
            className="w-full"
          >
            {googleLabel}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              {footerLinkText}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
