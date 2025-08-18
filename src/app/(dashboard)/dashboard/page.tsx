import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import LogoutButton from './components/LogoutButton/page'
const Page =  async () => {
    const session = await getServerSession()
    if(!session){
        redirect("/login")
    }
  return (
    <div>
    <div>Olá, {session?.user?.name}</div>
      <div>dashboard</div>
      <LogoutButton></LogoutButton>
    </div>
  )
}

export default Page
