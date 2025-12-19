"use client"

import { Event } from "@/model/Event"
import EventCard from "./event-card"
import { useState } from "react"

interface EventsSectionProps {
  events: Event[]
  title?: string
  showAll?: boolean
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

export default function EventsSection({ 
  events, 
  title = "Próximos Eventos",
  showAll = false 
}: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos")
  
  const categories = Array.from(new Set(events.map(e => e.category)))
  
  const filteredEvents = selectedCategory === "todos"
    ? events
    : events.filter(e => e.category === selectedCategory)

  if (events.length === 0) {
    return (
      <div className="w-full max-w-[95rem] mx-auto px-4 sm:px-16 py-12">
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
          <p className="text-gray-600 text-lg">
            Nenhum evento disponível no momento.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[95rem] mx-auto px-4 sm:px-16 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--main-color)] mb-4">
          {title}
        </h2>
        <div className="w-24 h-1 bg-[var(--main-color)] mx-auto rounded-full"></div>
      </div>

      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory("todos")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === "todos"
                ? "bg-[var(--main-color)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? "bg-[var(--main-color)] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && selectedCategory !== "todos" && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            Nenhum evento encontrado na categoria selecionada.
          </p>
        </div>
      )}
    </div>
  )
}


