import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import LogoutButton from './components/LogoutButton/page'
import UsernameComponent from './components/UsernameComponent/page'
import supabase from '../../../../utils/supabase/client'

const Page =  async () => {
  const session = await supabase.auth.getUser()
  if (!session || session == null) {
    redirect('/')
  }
  console.log(session)
  return (
    <div>
    <div>Olá, <UsernameComponent /></div>
      <div>dashboard</div>
      <LogoutButton></LogoutButton>
    </div>
  )
}

export default Page
