"use client"

import { Event } from "@/model/Event"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
// Função auxiliar para formatar datas
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ]
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
}

const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}

interface EventCardProps {
  event: Event
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

export default function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.start_date)
  const endDate = event.end_date ? new Date(event.end_date) : null
  
  const isMultiDay = endDate && 
    (endDate.getTime() - startDate.getTime()) > 24 * 60 * 60 * 1000

  return (
    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {event.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="px-3 py-1 bg-[var(--main-color)] text-white text-xs font-semibold rounded-full">
            {categoryLabels[event.category] || event.category}
          </span>
          {event.price_info && (
            <span className="text-sm font-semibold text-[var(--main-color)]">
              {event.price_info}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[var(--main-color)] flex-shrink-0 mt-0.5"
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
            <div className="text-sm text-gray-700">
              <p className="font-semibold">{formatDate(event.start_date)}</p>
              {!isMultiDay && (
                <p className="text-gray-500">às {formatTime(event.start_date)}</p>
              )}
              {isMultiDay && endDate && (
                <p className="text-gray-500">
                  até {formatDate(event.end_date!)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[var(--main-color)] flex-shrink-0 mt-0.5"
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
            <div className="text-sm text-gray-700">
              <p className="font-semibold">{event.location}</p>
              {event.address && (
                <p className="text-gray-500">{event.address}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          {event.google_maps_link && (
            <a
              href={event.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition-colors text-sm"
            >
              Ver no Mapa
            </a>
          )}
          {event.contact_phone && (
            <a
              href={`tel:${event.contact_phone.replace(/\s/g, "")}`}
              className="flex-1 text-center px-4 py-2 bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 text-white font-semibold rounded-md transition-colors text-sm"
            >
              Contato
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

