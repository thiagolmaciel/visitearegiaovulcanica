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
import { useRouter } from "next/navigation";

type Step = 'email' | 'code' | 'password' | 'success';

export function RecoverAccountForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // Enviar código OTP para recuperação de conta
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth/recover`,
        },
      });
      
      if (error) throw error;
      setStep('code');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao enviar código");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // Verificar código OTP
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'recovery',
      });
      
      if (error) throw error;
      setStep('password');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Código inválido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
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
      // Atualizar senha
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setStep('success');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao atualizar senha");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Senha Alterada com Sucesso!</CardTitle>
            <CardDescription>Sua senha foi alterada com sucesso</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Você pode fazer login agora com sua nova senha.
            </p>
            <Link href={'/auth/login'}>
              <Button className="w-full">Ir para Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {step === 'email' && (
        <form
          role="recover-account-email"
          className="flex items-center justify-center flex-col gap-4 w-full max-w-md"
          onSubmit={handleSendCode}
        >
          <div className="self-start w-full">
            <h2 className="text-xl sm:text-2xl font-bold">Recuperar Conta</h2>
            <h3 className="text-sm sm:text-base text-gray-500">
              Digite seu email e enviaremos um código de verificação
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

      {step === 'code' && (
        <form
          role="recover-account-code"
          className="flex items-center justify-center flex-col gap-4 w-full max-w-md"
          onSubmit={handleVerifyCode}
        >
          <div className="self-start w-full">
            <h2 className="text-xl sm:text-2xl font-bold">Verificar Código</h2>
            <h3 className="text-sm sm:text-base text-gray-500">
              Digite o código de 6 dígitos enviado para {email}
            </h3>
          </div>

          <Input
            type="text"
            placeholder="Código de 6 dígitos"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900 text-center text-xl sm:text-2xl tracking-widest font-mono"
          />

          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep('email')}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              Voltar
            </Button>

            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
              <Button
                className="w-full sm:w-[5rem] font-bold"
                disabled={isLoading || code.length !== 6}
                type="submit"
              >
                {isLoading ? "Verificando..." : "Verificar"}
              </Button>
            </div>
          </div>
          {error && <ErrorAlert error={translateError(error)} />}
        </form>
      )}

      {step === 'password' && (
        <form
          role="recover-account-password"
          className="flex items-center justify-center flex-col gap-4 w-full max-w-md"
          onSubmit={handleResetPassword}
        >
          <div className="self-start w-full">
            <h2 className="text-xl sm:text-2xl font-bold">Nova Senha</h2>
            <h3 className="text-sm sm:text-base text-gray-500">
              Digite sua nova senha
            </h3>
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nova senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
            />
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirmar senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              className="w-full min-w-0 sm:min-w-[20rem] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
            />
          </div>

          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep('code')}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              Voltar
            </Button>

            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
              <Button
                className="w-full sm:w-[5rem] font-bold"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
          {error && <ErrorAlert error={translateError(error)} />}
        </form>
      )}
    </div>
  );
}

