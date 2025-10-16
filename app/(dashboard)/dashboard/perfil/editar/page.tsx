import InfoTag from '@/components/dashboard/info-tag';
import { createClient } from '@/lib/supabase/server';
import { getProfile, getUserAvatar } from '@/service/profileServices';
import { redirect } from 'next/navigation';
import React from 'react'
import { User, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const EditarPerfilPage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  const id_user = data.claims.sub
  const profile = await getProfile(id_user)
  const avatarUrl = await getUserAvatar(id_user)

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Back Button */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/perfil" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <ArrowLeft size={20} />
          <span>Voltar ao perfil</span>
        </Link>
      </div>

      <InfoTag message='Edite suas informações pessoais. As alterações serão salvas automaticamente.'></InfoTag>
    
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-xl">Editar Informações Pessoais</h2>
          <p className="text-[#747474]">Atualize suas informações pessoais abaixo</p>
        </div>

        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col gap-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                <Image 
                  src={avatarUrl} 
                  alt="Avatar do usuário" 
                  width={80} 
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">Avatar</h3>
                <button className="text-sm text-[var(--main-color)] hover:underline">
                  Alterar foto
                </button>
              </div>
            </div>

            {/* Edit Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    defaultValue={profile?.full_name ?? ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    defaultValue={profile?.phone ?? ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localização
                  </label>
                  <input
                    type="text"
                    defaultValue={profile?.location ?? ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                    placeholder="Cidade, Estado"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent resize-none"
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="px-6 py-2 bg-[var(--main-color)] text-white rounded-lg hover:opacity-90 transition-opacity">
                Salvar alterações
              </button>
              <Link href="/dashboard/perfil">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarPerfilPage
