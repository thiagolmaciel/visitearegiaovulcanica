import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/service/adminServices";
import { FaCog, FaShieldAlt, FaDatabase, FaBell } from "react-icons/fa";

export default async function AdminConfiguracoesPage() {
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

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 text-lg">Gerencie as configurações do sistema</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FaShieldAlt className="text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Segurança</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">Autenticação de dois fatores</div>
                <div className="text-sm text-gray-500">Requer 2FA para administradores</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--main-color)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--main-color)]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">Logs de auditoria</div>
                <div className="text-sm text-gray-500">Registrar todas as ações administrativas</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--main-color)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--main-color)]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaDatabase className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Banco de Dados</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="font-medium text-gray-900 mb-2">Backup automático</div>
              <div className="text-sm text-gray-500 mb-3">Frequência de backup</div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]">
                <option>Diário</option>
                <option>Semanal</option>
                <option>Mensal</option>
              </select>
            </div>
            <button className="w-full px-4 py-2 bg-[var(--main-color)] text-white rounded-lg hover:bg-[var(--main-color)]/90 transition-colors font-medium">
              Criar Backup Agora
            </button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaBell className="text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Notificações</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">Notificações por email</div>
                <div className="text-sm text-gray-500">Receber alertas importantes</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--main-color)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--main-color)]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">Alertas de sistema</div>
                <div className="text-sm text-gray-500">Notificações sobre problemas</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--main-color)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--main-color)]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaCog className="text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Sistema</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="font-medium text-gray-900 mb-2">Modo de manutenção</div>
              <div className="text-sm text-gray-500 mb-3">Desativar acesso público temporariamente</div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--main-color)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--main-color)]"></div>
              </label>
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-2">Versão do sistema</div>
              <div className="text-sm text-gray-500">v1.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


