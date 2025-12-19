"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FaArrowLeft } from "react-icons/fa6"
import { FaSave } from "react-icons/fa"
import Link from "next/link"
import { simpleToast } from "@/utils/simple-toast"
import { Event } from "@/model/Event"
import { getEventByIdClient } from "@/service/eventServicesClient"

const AdminEditarEventoPage = () => {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [event, setEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    address: "",
    google_maps_link: "",
    image_url: "",
    category: "geral",
    status: "ativo",
    price_info: "",
    contact_email: "",
    contact_phone: "",
    website_url: "",
    instagram_url: "",
    facebook_url: "",
  })

  useEffect(() => {
    const fetchEvent = async () => {
      if (!params?.id) {
        router.push("/admin/eventos")
        return
      }

      try {
        const eventId = params.id.toString()
        const eventData = await getEventByIdClient(eventId)

        if (!eventData) {
          simpleToast("Evento não encontrado", "error")
          router.push("/admin/eventos")
          return
        }

        setEvent(eventData)

        // Converter datas para formato datetime-local
        const startDate = new Date(eventData.start_date)
        const endDate = eventData.end_date ? new Date(eventData.end_date) : null

        const formatDateTimeLocal = (date: Date) => {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, "0")
          const day = String(date.getDate()).padStart(2, "0")
          const hours = String(date.getHours()).padStart(2, "0")
          const minutes = String(date.getMinutes()).padStart(2, "0")
          return `${year}-${month}-${day}T${hours}:${minutes}`
        }

        setFormData({
          title: eventData.title || "",
          description: eventData.description || "",
          start_date: formatDateTimeLocal(startDate),
          end_date: endDate ? formatDateTimeLocal(endDate) : "",
          location: eventData.location || "",
          address: eventData.address || "",
          google_maps_link: eventData.google_maps_link || "",
          image_url: eventData.image_url || "",
          category: eventData.category || "geral",
          status: eventData.status || "ativo",
          price_info: eventData.price_info || "",
          contact_email: eventData.contact_email || "",
          contact_phone: eventData.contact_phone || "",
          website_url: eventData.website_url || "",
          instagram_url: eventData.instagram_url || "",
          facebook_url: eventData.facebook_url || "",
        })
      } catch (error) {
        console.error("Erro ao carregar evento:", error)
        simpleToast("Erro ao carregar evento", "error")
        router.push("/admin/eventos")
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params?.id, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (!event) return

      // Validações básicas
      if (!formData.title.trim() || !formData.description.trim() || !formData.start_date || !formData.location.trim()) {
        simpleToast("Preencha todos os campos obrigatórios", "error")
        setSaving(false)
        return
      }

      const response = await fetch("/admin/eventos/atualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar evento")
      }

      simpleToast("Evento atualizado com sucesso!", "success")
      router.push("/admin/eventos")
    } catch (error: any) {
      console.error("Erro ao atualizar evento:", error)
      simpleToast(error.message || "Erro ao atualizar evento", "error")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Carregando evento...</div>
        </div>
      </div>
    )
  }

  if (!event) {
    return null
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/eventos">
          <Button variant="outline" size="sm">
            <FaArrowLeft className="mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Editar Evento</h1>
          <p className="text-gray-600 text-lg">Atualize as informações do evento</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Informações Básicas</h2>
          
          <div>
            <Label htmlFor="title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Festival de Inverno"
              required
              disabled={saving}
            />
          </div>

          <div>
            <Label htmlFor="description">
              Descrição <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva o evento..."
              rows={5}
              required
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Categoria</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
                disabled={saving}
              >
                <option value="geral">Geral</option>
                <option value="festival">Festival</option>
                <option value="turismo">Turismo</option>
                <option value="workshop">Workshop</option>
                <option value="gastronomia">Gastronomia</option>
                <option value="cultura">Cultura</option>
                <option value="esporte">Esporte</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
                disabled={saving}
              >
                <option value="ativo">Ativo</option>
                <option value="rascunho">Rascunho</option>
                <option value="cancelado">Cancelado</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data e Local */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Data e Local</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">
                Data de Início <span className="text-red-500">*</span>
              </Label>
              <Input
                id="start_date"
                name="start_date"
                type="datetime-local"
                value={formData.start_date}
                onChange={handleChange}
                required
                disabled={saving}
              />
            </div>

            <div>
              <Label htmlFor="end_date">Data de Término (opcional)</Label>
              <Input
                id="end_date"
                name="end_date"
                type="datetime-local"
                value={formData.end_date}
                onChange={handleChange}
                disabled={saving}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">
              Local <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Centro de Poços de Caldas"
              required
              disabled={saving}
            />
          </div>

          <div>
            <Label htmlFor="address">Endereço Completo</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ex: Praça Getúlio Vargas, Centro - Poços de Caldas, MG"
              disabled={saving}
            />
          </div>

          <div>
            <Label htmlFor="google_maps_link">Link do Google Maps</Label>
            <Input
              id="google_maps_link"
              name="google_maps_link"
              type="url"
              value={formData.google_maps_link}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
              disabled={saving}
            />
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Informações Adicionais</h2>
          
          <div>
            <Label htmlFor="image_url">URL da Imagem</Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
              disabled={saving}
            />
          </div>

          <div>
            <Label htmlFor="price_info">Informações de Preço</Label>
            <Input
              id="price_info"
              name="price_info"
              value={formData.price_info}
              onChange={handleChange}
              placeholder="Ex: Entrada gratuita ou R$ 50,00"
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_email">Email de Contato</Label>
              <Input
                id="contact_email"
                name="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="contato@exemplo.com"
                disabled={saving}
              />
            </div>

            <div>
              <Label htmlFor="contact_phone">Telefone de Contato</Label>
              <Input
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                placeholder="+55 (35) 99999-9999"
                disabled={saving}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="website_url">Website</Label>
            <Input
              id="website_url"
              name="website_url"
              type="url"
              value={formData.website_url}
              onChange={handleChange}
              placeholder="https://exemplo.com"
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="instagram_url">Instagram</Label>
              <Input
                id="instagram_url"
                name="instagram_url"
                type="url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/exemplo"
                disabled={saving}
              />
            </div>

            <div>
              <Label htmlFor="facebook_url">Facebook</Label>
              <Input
                id="facebook_url"
                name="facebook_url"
                type="url"
                value={formData.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/exemplo"
                disabled={saving}
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Link href="/admin/eventos">
            <Button type="button" variant="outline" disabled={saving}>
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 text-white"
            disabled={saving}
          >
            <FaSave className="mr-2" />
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditarEventoPage

