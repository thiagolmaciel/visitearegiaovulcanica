import CreateMemberButton from '@/components/dashboard/create-member-button'
import InfoTag from '@/components/dashboard/info-tag';
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
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Meus Locais</h1>
          <p className="text-gray-600 text-lg">Gerencie e personalize seus agriturismos</p>
        </div>
        <InfoTag message='Nesta área estão seus locais públicos, os customize cuidadosamente.'></InfoTag>
      </div>
    
      <div className="flex flex-col gap-6">
        <ListPlaces id={id_user}></ListPlaces>
      </div>
    </div>
  )
}

export default MeusLocaisPage
