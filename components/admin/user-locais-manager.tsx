'use client'

import { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaEye, FaExchangeAlt, FaUnlink, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { simpleToast } from '@/utils/simple-toast'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface UserLocaisManagerProps {
  userId: string
  userMembers: any[] // Already includes imageUrl from server
  allUsers: any[]
}

export default function UserLocaisManager({ userId, userMembers, allUsers }: UserLocaisManagerProps) {
  const router = useRouter()
  
  // Debug: verificar se allUsers está sendo passado
  useEffect(() => {
    console.log('UserLocaisManager - allUsers:', allUsers)
    console.log('UserLocaisManager - userId:', userId)
  }, [allUsers, userId])

  const handleTransferMember = async (memberId: string, newUserId: string) => {
    try {
      const response = await fetch('/admin/usuarios/transferir-local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, newUserId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao transferir local')
      }

      simpleToast('Local transferido com sucesso!', 'success')
      router.refresh()
    } catch (error: any) {
      simpleToast(error.message || 'Erro ao transferir local', 'error')
    }
  }

  const handleRemoveControl = async (memberId: string) => {
    try {
      const response = await fetch('/admin/usuarios/remover-controle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao remover controle')
      }

      simpleToast('Controle removido com sucesso!', 'success')
      router.refresh()
    } catch (error: any) {
      simpleToast(error.message || 'Erro ao remover controle', 'error')
    }
  }

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Locais do Usuário</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {userMembers.length} {userMembers.length === 1 ? 'local' : 'locais'}
          </div>
          <Link
            href={`/admin/locais/cadastrar?userId=${userId}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <FaPlus />
            Criar Local
          </Link>
        </div>
      </div>

      {userMembers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FaMapMarkerAlt className="text-gray-400 text-4xl mx-auto mb-4" />
          <p className="text-gray-500">Este usuário não possui locais cadastrados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userMembers.map((member: any) => (
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
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      href={`/afiliados/${member.slug}`}
                      target="_blank"
                      className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-center gap-2 transition-colors"
                    >
                      <FaEye />
                      <span className="hidden sm:inline">Ver</span>
                    </Link>
                    <TransferMemberDialog
                      member={member}
                      allUsers={allUsers}
                      currentUserId={userId}
                      onTransfer={handleTransferMember}
                    />
                    <RemoveControlDialog
                      member={member}
                      onRemove={handleRemoveControl}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Dialog para transferir local
function TransferMemberDialog({ 
  member, 
  allUsers, 
  currentUserId,
  onTransfer 
}: { 
  member: any
  allUsers: any[]
  currentUserId: string
  onTransfer: (memberId: string, newUserId: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!selectedUserId) {
      simpleToast('Selecione um usuário', 'error')
      return
    }

    setLoading(true)
    await onTransfer(member.id, selectedUserId)
    setOpen(false)
    setLoading(false)
  }

  // Filtrar usuário atual da lista
  const availableUsers = allUsers?.filter(u => u && u.id && u.id !== currentUserId) || []
  
  // Debug: verificar se há usuários
  useEffect(() => {
    if (open) {
      console.log('All users:', allUsers)
      console.log('Current user ID:', currentUserId)
      console.log('Available users:', availableUsers)
    }
  }, [open, allUsers, currentUserId, availableUsers])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex-1 px-3 py-2 bg-[var(--main-color)]/10 hover:bg-[var(--main-color)]/20 rounded-lg text-sm font-medium text-[var(--main-color)] flex items-center justify-center gap-2 transition-colors">
          <FaExchangeAlt />
          <span className="hidden sm:inline">Transferir</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Transferir Local</DialogTitle>
          <DialogDescription>
            Transferir o controle do local <strong>{member.name}</strong> para outro usuário
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="user-select">Selecione o novo usuário</Label>
            {availableUsers.length === 0 ? (
              <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm">
                Nenhum outro usuário disponível para transferência
              </div>
            ) : (
              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
              >
                <option value="">Selecione um usuário...</option>
                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name || 'Sem nome'} {user.email ? `(${user.email})` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !selectedUserId}
          >
            {loading ? 'Transferindo...' : 'Transferir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Dialog para remover controle
function RemoveControlDialog({ 
  member, 
  onRemove 
}: { 
  member: any
  onRemove: (memberId: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await onRemove(member.id)
    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium text-red-600 flex items-center justify-center gap-2 transition-colors">
          <FaUnlink />
          <span className="hidden sm:inline">Remover</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remover Controle do Local</DialogTitle>
          <DialogDescription>
            Remover o controle do local <strong>{member.name}</strong> deste usuário.
            <br />
            <span className="text-red-600 font-medium mt-2 block">
              O local ficará sem proprietário. Você pode transferi-lo depois para outro usuário.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Removendo...' : 'Remover Controle'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

