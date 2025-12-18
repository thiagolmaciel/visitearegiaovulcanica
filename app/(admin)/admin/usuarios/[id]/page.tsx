import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { isAdmin, getAllUsers } from "@/service/adminServices";
import { getProfile } from "@/service/profileServices";
import { getMembersByProfileID } from "@/service/profileServices";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import UserLocaisManager from "@/components/admin/user-locais-manager";
import EditUserInfo from "@/components/admin/edit-user-info";

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

  // Get email from auth.users (not from profiles table)
  let userEmail = '';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (serviceRoleKey && supabaseUrl) {
    try {
      const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
      
      const { data: authUser, error: authError } = await adminClient.auth.admin.getUserById(id);
      if (!authError && authUser?.user) {
        userEmail = authUser.user.email || '';
      }
    } catch (error) {
      console.error('Erro ao buscar email do usuário:', error);
    }
  }
  
  // Fallback: try to get from profile if available (for backwards compatibility)
  if (!userEmail && (userProfile as any).email) {
    userEmail = (userProfile as any).email;
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
            Usuário: <span className="text-[var(--main-color)]">{userProfile.full_name || userEmail}</span>
          </h1>
          <p className="text-gray-600 text-lg">Gerencie as informações e locais deste usuário</p>
        </div>
      </div>

      {/* User Info Card - Editable */}
      <EditUserInfo 
        userId={id}
        initialEmail={userEmail}
        initialFullName={userProfile.full_name}
      />

      {/* User Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="text-sm text-gray-600">
          <strong>Total de Locais:</strong> {userMembers.length}
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

