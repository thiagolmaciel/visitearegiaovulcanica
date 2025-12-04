'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaPlus, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { createClient } from '@/lib/supabase/client'
import { simpleToast } from '@/utils/simple-toast'
import { useRouter } from 'next/navigation'

export default function CreateUserDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validações
    if (!formData.email || !formData.password || !formData.fullName) {
      simpleToast('Preencha todos os campos obrigatórios', 'error')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      simpleToast('As senhas não coincidem', 'error')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      simpleToast('A senha deve ter pelo menos 6 caracteres', 'error')
      setLoading(false)
      return
    }

    try {
      // Chamar API route para criar usuário
      const response = await fetch('/admin/usuarios/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar usuário')
      }

      simpleToast('Usuário criado com sucesso!', 'success')
      setOpen(false)
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
      })
      
      // Recarregar a página para mostrar o novo usuário
      router.refresh()
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error)
      simpleToast(
        error.message || 'Erro ao criar usuário. Tente novamente.',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 text-white flex items-center gap-2">
          <FaPlus />
          <span>Cadastrar Usuário</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar um novo usuário no sistema
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <FaUser className="text-gray-400" />
              Nome Completo
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Nome completo do usuário"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="usuario@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <FaLock className="text-gray-400" />
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
              <FaLock className="text-gray-400" />
              Confirmar Senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Digite a senha novamente"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

