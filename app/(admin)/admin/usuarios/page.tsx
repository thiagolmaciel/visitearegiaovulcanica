import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin, getAllUsers } from "@/service/adminServices";
import { FaUsers, FaSearch, FaEdit } from "react-icons/fa";
import CreateUserDialog from "@/components/admin/create-user-dialog";
import DeleteUserButton from "@/components/admin/delete-user-button";
import Link from "next/link";

export default async function AdminUsersPage() {
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
  
  const users = await getAllUsers();

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Gerenciar Usuários</h1>
          <p className="text-gray-600 text-lg">Visualize e gerencie todos os usuários do sistema</p>
        </div>
        <CreateUserDialog />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuários por nome ou email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Cadastro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center">
                            <FaUsers className="text-[var(--main-color)]" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name || 'Sem nome'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.updated_at ? new Date(user.updated_at).toLocaleDateString('pt-BR') : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/usuarios/${user.id}`}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-center gap-2 transition-colors"
                        >
                          <FaEdit />
                          <span>Editar</span>
                        </Link>
                        <DeleteUserButton 
                          userId={user.id} 
                          userName={user.full_name || user.email || 'Usuário'}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Total de Usuários</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{users.length}</div>
        </div>
      </div>
    </div>
  );
}


