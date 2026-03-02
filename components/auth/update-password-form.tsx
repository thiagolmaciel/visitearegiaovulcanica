"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorAlert from "./error-alert";
import translateError from "@/utils/translateError";

export function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (!password || password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      // Redirecionar para o dashboard após atualizar a senha
      router.push("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro ao atualizar a senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form role="update-password" className="flex items-center justify-center flex-col gap-4 w-full max-w-md">
      <div className="self-start w-full">
        <h2 className="text-xl sm:text-2xl font-bold">
          Redefinir <span className="text-emerald-900">senha</span>
        </h2>
        <h3 className="text-sm sm:text-base text-gray-500">Digite sua nova senha abaixo</h3>
      </div>

      <Input
        type="password"
        placeholder="Nova senha"
        name="password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
      />
      <Input
        type="password"
        placeholder="Confirmar nova senha"
        name="confirm-password"
        required
        minLength={6}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
      />

      <div className="w-full flex flex-row items-center justify-end">
        <Button
          className="w-full sm:w-[7rem] font-bold"
          disabled={isLoading}
          type="submit"
          onClick={handleUpdatePassword}
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
      
      {error && <ErrorAlert error={translateError(error)} />}
    </form>
  );
}
