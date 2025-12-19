"use client"

import { useState } from "react"
import { Event } from "@/model/Event"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"
import DeleteEventButton from "./delete-event-button"

interface EventsGridProps {
  events: Event[]
}

const categoryLabels: Record<string, string> = {
  geral: "Geral",
  festival: "Festival",
  turismo: "Turismo",
  workshop: "Workshop",
  gastronomia: "Gastronomia",
  cultura: "Cultura",
  esporte: "Esporte",
  outro: "Outro",
}

const statusLabels: Record<string, { label: string; color: string }> = {
  ativo: { label: "Ativo", color: "bg-green-100 text-green-800" },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800" },
  finalizado: { label: "Finalizado", color: "bg-gray-100 text-gray-800" },
  rascunho: { label: "Rascunho", color: "bg-yellow-100 text-yellow-800" },
}

export default function EventsGrid({ events }: EventsGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "todos" || event.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos por título, descrição ou local..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("todos")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "todos"
                  ? "bg-[var(--main-color)] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            {Object.entries(statusLabels).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === key
                    ? "bg-[var(--main-color)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-600 text-lg">
            {searchQuery || statusFilter !== "todos"
              ? "Nenhum evento encontrado com os filtros aplicados."
              : "Nenhum evento cadastrado ainda."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const status = statusLabels[event.status] || statusLabels.ativo

            return (
              <Card key={event.id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                {event.image_url && (
                  <div className="w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-[var(--main-color)] text-white text-xs font-semibold rounded-full">
                      {categoryLabels[event.category] || event.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-[var(--main-color)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{formatDate(event.start_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-[var(--main-color)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/admin/eventos/editar/${event.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <FaEdit />
                        Editar
                      </Button>
                    </Link>
                    <DeleteEventButton eventId={event.id} eventTitle={event.title} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}


