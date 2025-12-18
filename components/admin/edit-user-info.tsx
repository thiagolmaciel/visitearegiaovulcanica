'use client'

import { useState } from 'react'
import { FaUsers, FaEdit, FaSave, FaTimes, FaKey } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

interface EditUserInfoProps {
  userId: string
  initialEmail: string
  initialFullName: string | null
}

export default function EditUserInfo({ userId, initialEmail, initialFullName }: EditUserInfoProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState(initialEmail)
  const [fullName, setFullName] = useState(initialFullName || '')

  const handleSave = async () => {
    if (!email.trim()) {
      simpleToast('Email é obrigatório', 'error')
      return
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      simpleToast('Email inválido', 'error')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/admin/usuarios/atualizar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          email: email.trim(),
          fullName: fullName.trim() || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar usuário')
      }

      simpleToast('Usuário atualizado com sucesso!', 'success')
      setIsEditing(false)
      router.refresh()
    } catch (error: any) {
      simpleToast(error.message || 'Erro ao atualizar usuário', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEmail(initialEmail)
    setFullName(initialFullName || '')
    setIsEditing(false)
  }

  const handleSendPasswordReset = async () => {
    setLoading(true)
    try {
      const response = await fetch('/admin/usuarios/enviar-reset-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          email,
        }),
      })

      // Verificar se a resposta tem conteúdo antes de fazer parse
      const contentType = response.headers.get('content-type')
      let data: any = {}
      
      if (contentType && contentType.includes('application/json')) {
        const text = await response.text()
        if (text && text.trim()) {
          // Verificar se não é HTML disfarçado
          const isHTML = text.trim().toLowerCase().startsWith('<!doctype') || 
                        text.trim().toLowerCase().startsWith('<html')
          
          if (isHTML) {
            throw new Error('Resposta inválida do servidor')
          }
          
          try {
            data = JSON.parse(text)
          } catch (parseError) {
            console.error('Erro ao fazer parse da resposta:', parseError)
            throw new Error('Resposta inválida do servidor')
          }
        }
      } else {
        // Se não for JSON, tentar ler como texto
        const text = await response.text()
        if (text && text.trim()) {
          // Remover HTML se houver
          const cleanText = text.replace(/<[^>]*>/g, '').trim()
          if (cleanText && !text.toLowerCase().includes('<!doctype') && !text.toLowerCase().includes('<html')) {
            data = { message: cleanText.substring(0, 200) }
          }
        }
      }

      if (!response.ok) {
        // Limpar mensagem de erro de qualquer HTML
        const errorMsg = data.error || data.message || 'Erro ao enviar email de recuperação'
        const cleanError = errorMsg.replace(/<[^>]*>/g, '').trim()
        throw new Error(cleanError || 'Erro ao enviar email de recuperação')
      }

      // Limpar mensagem de sucesso também
      const successMsg = data.message || 'Email de recuperação de senha enviado com sucesso!'
      const cleanSuccess = successMsg.replace(/<[^>]*>/g, '').trim()
      simpleToast(cleanSuccess, 'success')
    } catch (error: any) {
      console.error('Erro ao enviar email de recuperação:', error)
      simpleToast(error.message || 'Erro ao enviar email de recuperação', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center flex-shrink-0">
          <FaUsers className="text-[var(--main-color)] text-2xl" />
        </div>
        <div className="flex-1">
          {!isEditing ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {fullName || 'Sem nome'}
                </h2>
                <div className="ml-auto flex gap-2">
                  <SendPasswordResetDialog
                    email={email}
                    onSend={handleSendPasswordReset}
                    loading={loading}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit className="mr-2" />
                    Editar
                  </Button>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div><strong>Email:</strong> {email || 'N/A'}</div>
                <div><strong>ID:</strong> <span className="font-mono text-xs">{userId}</span></div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Editar Informações</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <FaTimes className="mr-2" />
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <FaSave className="mr-2" />
                    {loading ? 'Salvando...' : 'Salvar'}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nome completo"
                    className="max-w-md"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    required
                    className="max-w-md"
                  />
                  <p className="text-xs text-gray-500">
                    O email será atualizado no sistema de autenticação e no perfil do usuário.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Dialog para enviar email de recuperação de senha
function SendPasswordResetDialog({ 
  email, 
  onSend,
  loading 
}: { 
  email: string
  onSend: () => void
  loading: boolean
}) {
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    await onSend()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={loading || !email}
        >
          <FaKey className="mr-2" />
          Alterar Senha
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar Email de Recuperação de Senha</DialogTitle>
          <DialogDescription>
            Um email com instruções para alterar a senha será enviado para:
            <br />
            <strong className="text-gray-900">{email}</strong>
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
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Email'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

