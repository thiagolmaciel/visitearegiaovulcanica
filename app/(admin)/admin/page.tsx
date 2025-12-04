import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/service/profileServices";
import { isAdmin, getAdminStats } from "@/service/adminServices";
import InfoTag from "@/components/dashboard/info-tag";
import Link from "next/link";
import { FaUsers, FaMapMarkerAlt, FaArrowRight, FaChartLine, FaUserPlus } from "react-icons/fa";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  
  const userId = data.claims.sub;
  const profile = await getProfile(userId);
  
  // Check if user is admin
  const userIsAdmin = await isAdmin(userId);
  if (!userIsAdmin) {
    redirect("/dashboard");
  }
  
  const stats = await getAdminStats();

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Olá, <span className="text-[var(--main-color)]">{profile?.full_name ?? 'Administrador'}</span>
          </h1>
          <p className="text-gray-600 text-lg">Bem-vindo ao painel administrativo</p>
        </div>
        <InfoTag message='Este é o painel administrativo, gerencie usuários, locais e configurações do sistema aqui.'></InfoTag>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total de Usuários</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              <p className="text-xs text-gray-500 mt-1">+{stats.recentUsers} esta semana</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
          <Link 
            href="/admin/usuarios"
            className="mt-4 inline-flex items-center text-sm text-[var(--main-color)] hover:underline font-medium"
          >
            Ver todos <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total de Locais</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
              <p className="text-xs text-gray-500 mt-1">+{stats.recentMembers} esta semana</p>
            </div>
            <div className="w-12 h-12 bg-[var(--main-color)]/10 rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="text-[var(--main-color)] text-xl" />
            </div>
          </div>
          <Link 
            href="/admin/locais"
            className="mt-4 inline-flex items-center text-sm text-[var(--main-color)] hover:underline font-medium"
          >
            Ver todos <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Estatísticas</p>
              <p className="text-lg font-semibold text-gray-900">Análises</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaChartLine className="text-purple-600 text-xl" />
            </div>
          </div>
          <Link 
            href="/admin/estatisticas"
            className="mt-4 inline-flex items-center text-sm text-[var(--main-color)] hover:underline font-medium"
          >
            Ver relatórios <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Configurações</p>
              <p className="text-lg font-semibold text-gray-900">Sistema</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <Link 
            href="/admin/configuracoes"
            className="mt-4 inline-flex items-center text-sm text-[var(--main-color)] hover:underline font-medium"
          >
            Configurar <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/admin/usuarios"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gerenciar Usuários</h3>
                <p className="text-sm text-gray-600">Visualizar e editar usuários do sistema</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/locais"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--main-color)]/10 rounded-lg flex items-center justify-center">
                <FaMapMarkerAlt className="text-[var(--main-color)] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gerenciar Locais</h3>
                <p className="text-sm text-gray-600">Visualizar e editar locais cadastrados</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}


