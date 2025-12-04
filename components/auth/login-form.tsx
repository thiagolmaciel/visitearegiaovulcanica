"use client"

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import ErrorAlert from "./error-alert";
import translateError from "@/utils/translateError";


export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            
            // Check if user is admin and redirect accordingly
            if (data?.user) {
                const isAdmin = data.user.user_metadata?.is_admin === true || 
                               data.user.user_metadata?.is_admin === 'true';
                router.push(isAdmin ? "/admin" : "/dashboard");
            } else {
                router.push("/dashboard");
            }
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Erro ao entrar");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            router.push("/dashboard");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Erro ao registrar");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form role="login" className="flex items-center justify-center flex-col gap-4">
            <div className="self-start">
                <h2 className="text-2xl font-bold">
                    Bem vindo, <span className="text-emerald-900">afiliado</span>!
                </h2>
                <h3 className="text-gray-500">Insira seus dados para acessar sua conta</h3>
            </div>

            <Input
                type="text"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Senha"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="min-w-[20rem] flex flex-row items-center justify-between">
                <div>
                    <Link href={'/auth/forgot-password'} className="text-sm text-gray-400">Esqueci minha senha</Link>
                </div>
                <div>
                    <Button
                        className="w-[5rem] font-bold"
                        disabled={isLoading}
                        type="submit"
                        onClick={handleLogin}
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </div>
            </div>
            
            {error && <ErrorAlert error={translateError(error)} />}
        </form>
    );
}