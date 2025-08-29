import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { getProfile } from "@/service/profileServices";
import ListPlaces from "@/components/dashboard/list-places";
import CreateMemberButton from "@/components/dashboard/create-member-button";
import InfoTag from "@/components/dashboard/info-tag";
import GuideBlocks from "@/components/dashboard/guide-blocks";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  const id_user = data.claims.sub
  const profile = await getProfile(id_user)

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="w-full">
        <InfoTag message='Este é seu dashboard pessoal, gerencie seus agriturismos aqui'></InfoTag>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h1>Olá, <span className="text-[var(--main-color)]">{profile?.full_name ?? 'Usuário'}</span> </h1>
        <p>Este é o seu dashboard</p>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <GuideBlocks />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-xl mb-4">Seu json (para teste) </h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data.claims, null, 2)}
        </pre>
      </div>
        {/* <div>
      <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div> */}
    </div>
  );
}
