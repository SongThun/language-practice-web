import type { SupabaseClient } from "@supabase/supabase-js";

export const PROTECTED_ROUTES = ["/dashboard", "/words", "/practice"];
export const AUTH_ROUTES = ["/login", "/signup"];

export async function signInWithGoogle(
  supabase: SupabaseClient,
  setError: (message: string) => void
): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    setError(error.message);
  }
}
