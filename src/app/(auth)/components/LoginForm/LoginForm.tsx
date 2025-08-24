'use client'

import { signIn, signUp } from "../../../../../lib/auth-actions";

export default function LoginForm() {
 
    return (
        <form action='' role='login' className='flex items-center justify-center  flex-col gap-4'>
            <div className="self-start">
                <h2 className='text-2xl font-bold'>Bem vindo, <span className='text-emerald-900 '>afiliado</span>!</h2>
                <h3 className='text-gray-500'>Insira seus dados para acessar sua conta</h3>
            </div>
            <input
                type="text"
                placeholder='Email'
                name="email"
            />
            <input
                type="password"
                placeholder='Senha'
                name="password"
            />
            <div className="min-w-[20rem] flex flex-row items-center justify-between">
                <div><p className='text-sm text-gray-400'>Esqueci minha senha</p></div>
                <div><button className='btn' formAction={signIn} type="submit">Entrar</button></div>
            </div>
            <div><button className='btn' formAction={signUp} type="submit">Registro</button></div>

          
        </form>
    )
}

