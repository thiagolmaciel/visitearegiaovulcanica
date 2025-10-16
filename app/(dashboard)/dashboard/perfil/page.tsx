import InfoTag from '@/components/dashboard/info-tag';
import { createClient } from '@/lib/supabase/server';
import { getProfile, getUserAvatar } from '@/service/profileServices';
import { redirect } from 'next/navigation';
import React from 'react'
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PerfilPage = async () => {
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
      <InfoTag message='Gerencie suas informações pessoais e configurações da conta.'></InfoTag>
    
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-xl">Informações do Perfil</h2>
          <p className="text-[#747474]">Visualize e edite suas informações pessoais</p>
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
                <h3 className="text-lg font-semibold text-gray-800">
                  {profile?.full_name ?? 'Usuário'}
                </h3>
                <p className="text-sm text-gray-500">Membro desde {new Date().getFullYear()}</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">
                    {data.claims.email ?? 'Não informado'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="text-sm font-medium text-gray-800">
                    {profile?.phone ?? 'Não informado'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="text-sm font-medium text-gray-800">
                    {profile?.location ?? 'Não informado'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Última atualização</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-xl">Configurações da Conta</h2>
          <p className="text-[#747474]">Gerencie as configurações da sua conta</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Informações Pessoais</h4>
                  <p className="text-sm text-gray-500">Editar nome, telefone e localização</p>
                </div>
              </div>
              <Link href="/dashboard/perfil/editar">
                <button className="px-4 py-2 bg-[var(--main-color)] text-white rounded-lg hover:opacity-90 transition-opacity">
                  Editar
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Email e Senha</h4>
                  <p className="text-sm text-gray-500">Alterar email ou senha da conta</p>
                </div>
              </div>
              <Link href="/dashboard/perfil/alterar-email">
                <button className="px-4 py-2 bg-[var(--main-color)] text-white rounded-lg hover:opacity-90 transition-opacity">
                  Alterar
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Preferências</h4>
                  <p className="text-sm text-gray-500">Configurar notificações e idioma</p>
                </div>
              </div>
              <Link href="/dashboard/perfil/preferencias">
                <button className="px-4 py-2 bg-[var(--main-color)] text-white rounded-lg hover:opacity-90 transition-opacity">
                  Configurar
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-xl">Estatísticas</h2>
          <p className="text-[#747474]">Acompanhe suas atividades na plataforma</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-blue-600">0</span>
            </div>
            <h4 className="font-semibold text-gray-800">Agriturismos</h4>
            <p className="text-sm text-gray-500">Total cadastrado</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-green-600">0</span>
            </div>
            <h4 className="font-semibold text-gray-800">Visualizações</h4>
            <p className="text-sm text-gray-500">Este mês</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-purple-600">0</span>
            </div>
            <h4 className="font-semibold text-gray-800">Contatos</h4>
            <p className="text-sm text-gray-500">Recebidos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPage
