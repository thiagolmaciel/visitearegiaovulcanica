'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HashFragmentHandler() {
  const router = useRouter()

  useEffect(() => {
    // Verificar se há hash fragments de recuperação de senha
    const hash = window.location.hash.substring(1)
    if (hash) {
      const hashParams = new URLSearchParams(hash)
      const type = hashParams.get('type')
      const accessToken = hashParams.get('access_token')
      
      // Se for recovery, redirecionar para callback
      if (type === 'recovery' && accessToken) {
        // Redirecionar para callback que processará o token
        router.push(`/auth/callback${window.location.hash}`)
        return
      }
    }
  }, [router])

  return null
}

