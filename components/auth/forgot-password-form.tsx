"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import ErrorAlert from "./error-alert";
import translateError from "@/utils/translateError";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
          <div className="">
            <CardHeader>
              <CardTitle className="text-2xl">Cheque seu Email</CardTitle>
              <CardDescription>Instruções para trocar sua senha enviadas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
              Acesse seu email e siga o passo-a-passo para obter novamente o seu acesso à conta.
              </p>
              <Link href={'/auth/login'} className="text-sm text-gray-400 mt-2">Voltar</Link>

            </CardContent>
          </div>
      ) : (
        <form
          role="forgot-password"
          className="flex items-center justify-center flex-col gap-4 w-full max-w-md"
          onSubmit={handleForgotPassword}
        >
          <div className="self-start w-full">
            <h2 className="text-xl sm:text-2xl font-bold">Redefinir senha</h2>
            <h3 className="text-sm sm:text-base text-gray-500">
              Digite seu email e enviaremos o link para redefinir sua senha
            </h3>
          </div>

          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
          />

          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex justify-center sm:justify-start">
              <Link href={'/auth/login'} className="text-sm text-gray-400">Voltar</Link>
            </div>
            <div className="flex justify-center sm:justify-end">
              <Button
                className="w-full sm:w-[5rem] font-bold"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </div>
          {error && <ErrorAlert error={translateError(error)} />}
        </form>
      )}
    </div>
  );
}
