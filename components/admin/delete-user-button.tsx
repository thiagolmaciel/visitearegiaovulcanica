'use client'

import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
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

interface DeleteUserButtonProps {
  userId: string
  userName: string
}

export default function DeleteUserButton({ userId, userName }: DeleteUserButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/admin/usuarios/excluir?id=${userId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao excluir usuário')
      }

      simpleToast('Usuário excluído com sucesso!', 'success')
      setOpen(false)
      
      // Recarregar a página para atualizar a lista
      router.refresh()
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error)
      simpleToast(
        error.message || 'Erro ao excluir usuário. Tente novamente.',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium text-red-600 flex items-center justify-center gap-2 transition-colors">
          <FaTrash />
          <span>Excluir</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o usuário <strong>{userName}</strong>?
            <br />
            <span className="text-red-600 font-medium mt-2 block">
              Esta ação não pode ser desfeita.
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
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Excluir Usuário'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

