import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/service/adminServices";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import EventsGrid from "@/components/admin/events-grid";

export default async function AdminEventosPage() {
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
  
  // Buscar todos os eventos
  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  const eventsList = events || [];

  // Estatísticas
  const activeEvents = eventsList.filter((e: any) => e.status === "ativo").length;
  const upcomingEvents = eventsList.filter((e: any) => {
    if (e.status !== "ativo") return false;
    const startDate = new Date(e.start_date);
    return startDate >= new Date();
  }).length;

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Gerenciar Eventos</h1>
          <p className="text-gray-600 text-lg">Visualize e gerencie todos os eventos cadastrados</p>
        </div>
        <Link href="/admin/eventos/cadastrar">
          <Button className="bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 text-white">
            <FaPlus className="mr-2" />
            Novo Evento
          </Button>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">Total de Eventos</div>
              <div className="text-3xl font-bold text-gray-900 mt-1">{eventsList.length}</div>
            </div>
            <div className="w-16 h-16 bg-[var(--main-color)]/10 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="text-[var(--main-color)] text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">Eventos Ativos</div>
              <div className="text-3xl font-bold text-green-600 mt-1">{activeEvents}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">Próximos Eventos</div>
              <div className="text-3xl font-bold text-blue-600 mt-1">{upcomingEvents}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <EventsGrid events={eventsList} />
    </div>
  );
}


