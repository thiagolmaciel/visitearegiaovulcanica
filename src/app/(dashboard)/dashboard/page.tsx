import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
const Page =  async () => {
    const session = await getServerSession()
    if(!session){
        redirect("/")
    }
  return (
    <div>
    <div>Olá, {session?.user?.name}</div>
      <div>dashboard</div>
    </div>
  )
}

export default Page
