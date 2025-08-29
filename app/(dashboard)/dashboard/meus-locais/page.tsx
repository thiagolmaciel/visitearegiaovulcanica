import CreateMemberButton from '@/components/dashboard/create-member-button'
import ListPlaces from '@/components/dashboard/list-places'
import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/service/profileServices';
import { redirect } from 'next/navigation';
import React from 'react'

const MeusLocaisPage = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
      redirect("/auth/login");
    }
    const id_user = data.claims.sub
    const profile = await getProfile(id_user)
  return (
    <div className="flex-1 w-full flex flex-col gap-12 mt-5">
       <div className="flex flex-col gap-2 items-start">
      <h2 className="font-bold text-xl">Seus agriturismos</h2>
      <ListPlaces id={id_user}></ListPlaces>
      </div>
    </div>
  )
}

export default MeusLocaisPage
