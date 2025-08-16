'use client'

import { FormEvent } from "react";
import { signIn } from "next-auth/react"

export default function LoginForm() {
    async function login(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data={
            user: formData.get('user'),
            password: formData.get('password')
        }
        console.log(data)
        signIn("credentials", {
            ...data,
            callbackUrl: "/dashboard",
        }
        )
    }
    return (
        <form onSubmit={login} role='login' className='flex items-center justify-center  flex-col gap-4'>
            <div className="self-start">
                <h2 className='text-2xl font-bold'>Bem vindo, <span className='text-emerald-900 '>afiliado</span>!</h2>
                <h3 className='text-gray-500'>Insira seus dados para acessar sua conta</h3>
            </div>
            <input
                type="text"
                placeholder='Username'
                name="user"
                required
            />
            <input
                type="password"
                placeholder='Senha'
                name="password"
                required
            />
            <div className="min-w-[20rem] flex flex-row items-center justify-between">
                <div><p className='text-sm text-gray-400'>Esqueci minha senha</p></div>
                <div><button className='btn' type="submit">Entrar</button></div>
            </div>
        </form>
    )
}

