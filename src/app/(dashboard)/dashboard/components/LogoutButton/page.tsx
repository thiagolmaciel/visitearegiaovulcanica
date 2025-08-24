'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import supabase from'../../../../../../utils/supabase/client'

const LogoutButton = () => {
  const router = useRouter()

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Erro ao sair:", error.message)
      return
    }

    console.log("Sessão encerrada!")
    router.push("/login")
    router.refresh() // 
  }

  return (
    <button className="btn" onClick={handleLogout}>
      Sair
    </button>
  )
}

export default LogoutButton
