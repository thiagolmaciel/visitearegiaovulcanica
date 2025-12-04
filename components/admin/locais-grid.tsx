'use client'

import { useState, useMemo } from 'react'
import { FaMapMarkerAlt, FaEdit, FaTrash, FaEye, FaSearch, FaTimes, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface LocaisGridProps {
  members: any[]
}

export default function LocaisGrid({ members }: LocaisGridProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter members based on search query
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) {
      return members
    }

    const query = searchQuery.toLowerCase().trim()
    
    return members.filter((member: any) => {
      // Search in name
      const nameMatch = member.name?.toLowerCase().includes(query)
      
      // Search in description
      const descriptionMatch = member.description?.toLowerCase().includes(query)
      
      // Search in email
      const emailMatch = member.email?.toLowerCase().includes(query)
      
      // Search in whatsapp
      const whatsappMatch = member.whatsapp?.toLowerCase().includes(query)
      
      // Search in phone
      const phoneMatch = member.phone?.toLowerCase().includes(query)
      
      // Search in slug
      const slugMatch = member.slug?.toLowerCase().includes(query)

      return nameMatch || descriptionMatch || emailMatch || whatsappMatch || phoneMatch || slugMatch
    })
  }, [members, searchQuery])

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <>
      {/* Search Component */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar locais por nome, descrição, email, WhatsApp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] transition-all bg-white"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Limpar busca"
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {searchQuery && (
              <div className="text-sm text-gray-600 whitespace-nowrap">
                {filteredMembers.length} {filteredMembers.length === 1 ? 'resultado' : 'resultados'}
              </div>
            )}
            <Link
              href="/admin/locais/cadastrar"
              className="px-4 py-2 bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <FaPlus />
              <span>Adicionar Local</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            {searchQuery ? 'Nenhum local encontrado para sua busca' : 'Nenhum local encontrado'}
          </div>
        ) : (
          filteredMembers.map((member: any) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {member.imageUrl ? (
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                  <FaMapMarkerAlt className="text-gray-400 text-4xl" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {member.description || 'Sem descrição'}
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <span>Email:</span>
                      <span className="text-gray-900">{member.email}</span>
                    </div>
                  )}
                  {member.whatsapp && (
                    <div className="flex items-center gap-2">
                      <span>WhatsApp:</span>
                      <span className="text-gray-900">{member.whatsapp}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <Link
                    href={`/afiliados/${member.slug}`}
                    target="_blank"
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaEye />
                    Ver
                  </Link>
                  <Link
                    href={`/admin/locais/editar/${member.id}`}
                    className="px-3 py-2 bg-[var(--main-color)]/10 hover:bg-[var(--main-color)]/20 rounded-lg text-sm font-medium text-[var(--main-color)] flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaEdit />
                    Editar
                  </Link>
                  <button className="px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium text-red-600 flex items-center justify-center gap-2 transition-colors">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

