'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const AuthCallbackPageContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Processar hash fragments (access_token, etc)
      const hash = window.location.hash.substring(1) // Remove o #
      const hashParams = new URLSearchParams(hash)
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const type = hashParams.get('type')
      const error = hashParams.get('error')
      const errorDescription = hashParams.get('error_description')

      // Se houver erro, redirecionar para página de erro
      if (error) {
        router.push(`/auth/error?error=${encodeURIComponent(errorDescription || error)}`)
        return
      }

      // Se for recovery e tiver access_token, processar
      if (type === 'recovery' && accessToken) {
        const supabase = createClient()
        
        try {
          // Trocar o código por uma sessão
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          })

          if (sessionError) {
            console.error('Erro ao criar sessão:', sessionError)
            router.push(`/auth/error?error=${encodeURIComponent(sessionError.message)}`)
            return
          }

          // Redirecionar para página de atualização de senha
          router.push('/auth/update-password')
        } catch (err: any) {
          console.error('Erro ao processar callback:', err)
          router.push(`/auth/error?error=${encodeURIComponent(err.message || 'Erro desconhecido')}`)
        }
        return
      }

      // Processar query parameters (método antigo)
      const tokenHash = searchParams.get('token_hash')
      const typeParam = searchParams.get('type')
      const next = searchParams.get('next') || '/auth/update-password'

      if (tokenHash && typeParam) {
        const supabase = createClient()
        
        try {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            type: typeParam as any,
            token_hash: tokenHash,
          })

          if (verifyError) {
            router.push(`/auth/error?error=${encodeURIComponent(verifyError.message)}`)
            return
          }

          router.push(next)
        } catch (err: any) {
          console.error('Erro ao verificar OTP:', err)
          router.push(`/auth/error?error=${encodeURIComponent(err.message || 'Erro desconhecido')}`)
        }
        return
      }

      // Se não houver parâmetros, redirecionar para update-password
      router.push('/auth/update-password')
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="text-center">
        <p className="text-lg">Processando autenticação...</p>
        <p className="text-sm text-gray-500 mt-2">Aguarde um momento</p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Carregando...</p>
        </div>
      </div>
    }>
      <AuthCallbackPageContent />
    </Suspense>
  )
}

