"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import ErrorAlert from "./error-alert";
import translateError from "@/utils/translateError";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Use /auth/confirm for email confirmation (Supabase standard)
          emailRedirectTo: `${window.location.origin}/auth/confirm?type=signup&next=/dashboard`,
        },
      });
      
      if (error) throw error;
      
      // Check if email confirmation is required
      // If user is null, email confirmation is required and email was sent
      // If user exists, email confirmation might be disabled in Supabase settings
      if (data.user && !data.session) {
        // Email confirmation required - email should have been sent
        router.push("/auth/sign-up-success");
      } else if (data.session) {
        // Email confirmation disabled - user is automatically logged in
        router.push("/dashboard");
      } else {
        // Should not happen, but handle it
        router.push("/auth/sign-up-success");
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro ao criar a conta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form role="sign-up" className="flex items-center justify-center flex-col gap-4 w-full max-w-md">
      <div className="self-start w-full">
        <h2 className="text-xl sm:text-2xl font-bold">
          Criar <span className="text-emerald-900">conta</span>
        </h2>
        <h3 className="text-sm sm:text-base text-gray-500">Preencha os dados para se cadastrar</h3>
      </div>

      <Input
        type="email"
        placeholder="Email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
      />
      <Input
        type="password"
        placeholder="Senha"
        name="password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
      />
      <Input
        type="password"
        placeholder="Confirmar senha"
        name="repeat-password"
        required
        minLength={6}
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
      />

      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex justify-center sm:justify-start">
          <Link href={'/auth/login'} className="text-sm text-gray-400">Já tenho uma conta</Link>
        </div>
        <div className="flex justify-center sm:justify-end">
          <Button
            className="w-full sm:w-[7rem] font-bold"
            disabled={isLoading}
            type="submit"
            onClick={handleSignUp}
          >
            {isLoading ? "Criando..." : "Cadastrar"}
          </Button>
        </div>
      </div>
      
      {error && <ErrorAlert error={translateError(error)} />}
    </form>
  );
}
