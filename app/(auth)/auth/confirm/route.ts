import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * Email confirmation route handler
 * 
 * This route handles email confirmation links sent by Supabase.
 * When a user clicks the confirmation link in their email, Supabase redirects here
 * with token_hash and type parameters.
 * 
 * Usage:
 * - Email confirmation: /auth/confirm?token_hash=xxx&type=signup&next=/dashboard
 * - Password reset: /auth/confirm?token_hash=xxx&type=recovery&next=/auth/update-password
 * 
 * The 'next' parameter specifies where to redirect after successful confirmation.
 * Defaults to '/' if not provided.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // If type is signup, redirect to dashboard after confirmation
      // Otherwise, use the 'next' parameter
      if (type === 'signup') {
        redirect('/dashboard');
      } else {
        redirect(next);
      }
    } else {
      // redirect the user to an error page with some instructions
      redirect(`/auth/error?error=${encodeURIComponent(error.message)}`);
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=${encodeURIComponent("No token hash or type")}`);
}
