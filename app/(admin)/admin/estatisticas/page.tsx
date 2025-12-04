import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin, getAdminStats } from "@/service/adminServices";
import { FaChartBar, FaUsers, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";

export default async function AdminEstatisticasPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  
  const userId = data.claims.sub;
  const userIsAdmin = await isAdmin(userId);
  
  if (!userIsAdmin) {
    redirect("/dashboard");
  }
  
  const stats = await getAdminStats();

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Estatísticas</h1>
          <p className="text-gray-600 text-lg">Análise e relatórios do sistema</p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <FaArrowUp className="text-green-500" />
          </div>
          <div className="text-sm font-medium text-gray-600 mb-1">Total de Usuários</div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
          <div className="text-xs text-gray-500 mt-2">+{stats.recentUsers} esta semana</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[var(--main-color)]/10 rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="text-[var(--main-color)] text-xl" />
            </div>
            <FaArrowUp className="text-green-500" />
          </div>
          <div className="text-sm font-medium text-gray-600 mb-1">Total de Locais</div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalMembers}</div>
          <div className="text-xs text-gray-500 mt-2">+{stats.recentMembers} esta semana</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaChartBar className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-600 mb-1">Taxa de Crescimento</div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.totalUsers > 0 
              ? ((stats.recentUsers / stats.totalUsers) * 100).toFixed(1)
              : 0}%
          </div>
          <div className="text-xs text-gray-500 mt-2">Usuários (7 dias)</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaChartBar className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-600 mb-1">Taxa de Crescimento</div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.totalMembers > 0 
              ? ((stats.recentMembers / stats.totalMembers) * 100).toFixed(1)
              : 0}%
          </div>
          <div className="text-xs text-gray-500 mt-2">Locais (7 dias)</div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Crescimento de Usuários</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center">
              <FaChartBar className="text-4xl mx-auto mb-2" />
              <p>Gráfico será implementado aqui</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Crescimento de Locais</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center">
              <FaChartBar className="text-4xl mx-auto mb-2" />
              <p>Gráfico será implementado aqui</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


