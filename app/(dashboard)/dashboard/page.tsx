import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/service/profileServices";
import { getMembersByProfileID } from "@/service/profileServices";
import InfoTag from "@/components/dashboard/info-tag";
import GuideBlocks from "@/components/dashboard/guide-blocks";
import Link from "next/link";
import { FaMapMarkerAlt, FaPlus, FaArrowRight } from "react-icons/fa";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  const id_user = data.claims.sub
  const profile = await getProfile(id_user)
  const members = await getMembersByProfileID(id_user);
  const membersCount = members?.length || 0;

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Olá, <span className="text-[var(--main-color)]">{profile?.full_name ?? 'Usuário'}</span>
          </h1>
          <p className="text-gray-600 text-lg">Bem-vindo ao seu painel de controle</p>
        </div>
        <InfoTag message='Este é seu dashboard pessoal, gerencie seus agriturismos aqui'></InfoTag>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total de Locais</p>
              <p className="text-3xl font-bold text-gray-900">{membersCount}</p>
            </div>
            <div className="w-12 h-12 bg-[var(--main-color)]/10 rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="text-[var(--main-color)] text-xl" />
            </div>
          </div>
          <Link 
            href="/dashboard/meus-locais"
            className="mt-4 inline-flex items-center text-sm text-[var(--main-color)] hover:underline font-medium"
          >
            Ver todos <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Ações Rápidas</p>
              <p className="text-lg font-semibold text-gray-900">Gerenciar</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaPlus className="text-blue-600 text-xl" />
            </div>
          </div>
          <Link 
            href="/dashboard/meus-locais"
            className="mt-4 inline-flex items-center text-sm text-[var(--main-color)] hover:underline font-medium"
          >
            Adicionar local <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Perfil</p>
              <p className="text-lg font-semibold text-gray-900">Configurar</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <Link 
            href="/dashboard/perfil"
            className="mt-4 inline-flex items-center text-sm text-[var(--main-color)] hover:underline font-medium"
          >
            Editar perfil <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Ações Rápidas</h2>
        <GuideBlocks />
      </div>

      {/* Recent Activity or Quick Links */}
      {membersCount > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Seus Locais</h2>
            <Link 
              href="/dashboard/meus-locais"
              className="text-sm text-[var(--main-color)] hover:underline font-medium"
            >
              Ver todos
            </Link>
          </div>
          <p className="text-gray-600">
            Você tem <span className="font-semibold text-[var(--main-color)]">{membersCount}</span> {membersCount === 1 ? 'local cadastrado' : 'locais cadastrados'}. 
            <Link href="/dashboard/meus-locais" className="text-[var(--main-color)] hover:underline ml-1">
              Gerenciar agora
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
