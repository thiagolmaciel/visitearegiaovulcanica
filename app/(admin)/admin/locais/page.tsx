import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin, getAllMembers } from "@/service/adminServices";
import { FaMapMarkerAlt } from "react-icons/fa";
import LocaisGrid from "@/components/admin/locais-grid";

// Server-side function to get images
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

export default async function AdminLocaisPage() {
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
  
  const members = await getAllMembers();
  
  // Fetch images for each member
  const membersWithImages = await Promise.all(
    members.map(async (member: any) => {
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Gerenciar Locais</h1>
          <p className="text-gray-600 text-lg">Visualize e gerencie todos os locais cadastrados</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-600">Total de Locais</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">{members.length}</div>
          </div>
          <div className="w-16 h-16 bg-[var(--main-color)]/10 rounded-lg flex items-center justify-center">
            <FaMapMarkerAlt className="text-[var(--main-color)] text-2xl" />
          </div>
        </div>
      </div>

      {/* Search and Grid Component */}
      <LocaisGrid members={membersWithImages} />
    </div>
  );
}



