import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin, getAllUsers } from "@/service/adminServices";
import { getProfile } from "@/service/profileServices";
import { getMembersByProfileID } from "@/service/profileServices";
import { FaUsers, FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import UserLocaisManager from "@/components/admin/user-locais-manager";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Server-side function to get images (same pattern as admin/locais/page.tsx)
async function getMemberImages(memberId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .storage
    .from('members')
    .list(`images/${memberId}`, {
      limit: 1,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });

  if (error || !data || data.length === 0) {
    return null;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from('members')
    .getPublicUrl(`images/${memberId}/${data[0].name}`);

  return publicUrlData.publicUrl;
}

export default async function EditUserPage({ params }: PageProps) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  
  const adminId = data.claims.sub;
  const userIsAdmin = await isAdmin(adminId);
  
  if (!userIsAdmin) {
    redirect("/dashboard");
  }

  const { id } = await params;
  const userProfile = await getProfile(id);
  const userMembers = await getMembersByProfileID(id);
  const allUsers = await getAllUsers();

  if (!userProfile) {
    redirect("/admin/usuarios");
  }

  // Fetch images for each member (same pattern as admin/locais/page.tsx)
  const membersWithImages = await Promise.all(
    userMembers.map(async (member: any) => {
      try {
        const imageUrl = await getMemberImages(member.id);
        return {
          ...member,
          imageUrl,
        };
      } catch (error) {
        return {
          ...member,
          imageUrl: null,
        };
      }
    })
  );

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/usuarios"
          className="inline-flex items-center gap-2 text-[var(--main-color)] hover:underline text-sm font-medium mb-2"
        >
          <FaArrowLeft />
          Voltar para usuários
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Editar Usuário: <span className="text-[var(--main-color)]">{userProfile.full_name || userProfile.email}</span>
          </h1>
          <p className="text-gray-600 text-lg">Gerencie as informações e locais deste usuário</p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center flex-shrink-0">
            <FaUsers className="text-[var(--main-color)] text-2xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {userProfile.full_name || 'Sem nome'}
            </h2>
            <div className="space-y-1 text-sm text-gray-600">
              <div><strong>Email:</strong> {userProfile.email || 'N/A'}</div>
              <div><strong>ID:</strong> <span className="font-mono text-xs">{userProfile.id}</span></div>
              <div><strong>Total de Locais:</strong> {userMembers.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* User Locais Manager */}
      <UserLocaisManager 
        userId={id}
        userMembers={membersWithImages}
        allUsers={allUsers}
      />
    </div>
  );
}

