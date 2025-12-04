'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import InfoTag from '@/components/dashboard/info-tag'
import { getMembersByProfileID } from '@/service/profileServices'
import { Member } from '@/model/Member'
import { getMemberByID, updateMember, getMemberLocation } from '@/service/memberServices'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { simpleToast } from '@/utils/simple-toast'
import { slugify } from '@/utils/slugify'
import { Button } from '@/components/ui/button'
import { getImagesByID, updateImages } from '@/service/imagesServices'
import { ImageModel } from '@/model/ImageModel'
import Image from 'next/image'
import { FaX } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa'
import ServiceSelector from '@/components/dashboard/service-selector'
import { updateMemberServices } from '@/service/servicesServices'
import { createClient } from '@/lib/supabase/client'

const EditarPage = () => {
  const params = useParams()
  const router = useRouter()
  const [member, setMember] = useState<Member | null>(null)
  const [images, setImages] = useState<ImageModel[]>([])
  const [loading, setLoading] = useState(true)
  const [memberServices, setMemberServices] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])  
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<ImageModel[]>([])
  const [location, setLocation] = useState<any>(null)
  const [cities, setCities] = useState<any[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!params?.id) {
      router.push('/dashboard/meus-locais')
      return
    }

    const id = params.id.toString()

    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getMemberByID(id)
        setMember(data ?? null)

        const imgs = await getImagesByID(id)
        setImages(imgs ?? [])

        // Buscar location
        const loc = await getMemberLocation(id)
        setLocation(loc)

        // Buscar cidades
        const supabase = createClient()
        const { data: citiesData } = await supabase
          .from('cities')
          .select('*')
          .order('name')
        setCities(citiesData || [])
      } catch (error) {
        router.push('/dashboard/meus-locais')
        simpleToast('Erro ao carregar dados', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params?.id, router])

  if (loading || !member) {
    return <p>Carregando...</p>
  }

  function handleServicesChange(services: string[]) {
    setSelectedServices(services);
  }
  async function handleRemoveImage(image: ImageModel) {
    setImages(prev => prev.filter(img => img !== image))
    if (image.url) setImagesToDelete(prev => [...prev, image])
    setFilesToUpload(prev => prev.filter(f => f.name !== image.name))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    if (!form || !member) {
      simpleToast('Erro')
      return
    }

    const name = form.get('name') as string
    const description = form.get('description') as string
    const email = form.get('email') as string
    const whatsapp = form.get('whatsapp') as string
    const phone = form.get('phone') as string
    const instagram = form.get('instagram') as string
    const facebook = form.get('facebook') as string
    const website = form.get('website') as string
    const slug = slugify(name)

    // Location data
    const address = form.get('address') as string
    const google_maps_link = form.get('google_maps_link') as string
    const google_maps_embed = form.get('google_maps_embed') as string
    const city_id = form.get('city_id') as string

    const updatedMember: Member = {
      id: member.id,
      name,
      description,
      email,
      whatsapp,
      phone,
      instagram,
      facebook,
      website,
      slug,
      location_id: member.location_id,
      image: member.image,
    }

    try {
      const supabase = createClient()

      await updateMember(updatedMember)

      // Criar ou atualizar location
      if (address || google_maps_link || google_maps_embed || city_id) {
        if (location) {
          // Atualizar location existente
          await supabase
            .from('locations')
            .update({
              address: address || null,
              google_maps_link: google_maps_link || null,
              google_maps_embed: google_maps_embed || null,
              city_id: city_id || null,
            })
            .eq('member_id', member.id)
        } else {
          // Criar nova location
          const { data: newLocation } = await supabase
            .from('locations')
            .insert({
              member_id: member.id,
              address: address || null,
              google_maps_link: google_maps_link || null,
              google_maps_embed: google_maps_embed || null,
              city_id: city_id || null,
            })
            .select()
            .single()

          // Atualizar location_id no member
          if (newLocation) {
            await supabase
              .from('members')
              .update({ location_id: newLocation.id })
              .eq('id', member.id)
          }
        }
      }

      await updateImages(member.id, filesToUpload, imagesToDelete)
      await updateMemberServices(member.id, selectedServices);
      router.push('/dashboard/meus-locais')
      simpleToast('Local atualizado com sucesso', 'success')
    } catch (error) {
      console.error('Erro ao atualizar local:', error)
      simpleToast('Erro ao atualizar local', 'error')
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <InfoTag message="Edite aqui seu local" />
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-xl">{member.name}</h2>
        <p className="text-muted-foreground">
          Edite cautelosamente as informações do seu local. Todas estas informações serão públicas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-1 flex-col gap-6 flex-grow">
          <div className="flex flex-col gap-3">
            <Label>Nome</Label>
            <Input
              type="text"
              defaultValue={member.name}
              className="max-w-2xl w-full bg-white"
              placeholder="Nome do local"
              name="name"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Descrição</Label>
            <Textarea
              defaultValue={member.description}
              rows={15}
              className="max-w-3xl w-full bg-white"
              placeholder="Descrição do local"
              name="description"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Email</Label>
            <Input
              type="text"
              defaultValue={member.email}
              className="max-w-2xl w-full bg-white"
              placeholder="Email do local"
              name="email"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Whatsapp</Label>
            <Input
              type="text"
              defaultValue={member.whatsapp}
              className="max-w-2xl w-full bg-white"
              placeholder="Whatsapp do local"
              maxLength={11}
              name="whatsapp"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Telefone</Label>
            <Input
              type="text"
              defaultValue={member.phone}
              className="max-w-2xl w-full bg-white"
              placeholder="Telefone do local"
              maxLength={10}
              name="phone"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Instagram</Label>
            <Input
              type="text"
              defaultValue={member.instagram}
              className="max-w-2xl w-full bg-white"
              placeholder="instagram.com/meulocal"
              name="instagram"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Facebook</Label>
            <Input
              type="text"
              defaultValue={member.facebook}
              className="max-w-2xl w-full bg-white"
              placeholder="Facebook do local"
              name="facebook"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Website</Label>
            <Input
              type="text"
              defaultValue={member.website}
              className="max-w-2xl w-full bg-white"
              placeholder="site.com.br"
              name="website"
            />
          </div>

          {/* Seção de Localização */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Localização</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label>Endereço</Label>
                <Input
                  type="text"
                  defaultValue={location?.address || ''}
                  className="max-w-2xl w-full bg-white"
                  placeholder="Endereço completo"
                  name="address"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Cidade</Label>
                <select
                  name="city_id"
                  defaultValue={location?.city_id || ''}
                  className="max-w-2xl w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
                >
                  <option value="">Selecione uma cidade</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Link do Google Maps</Label>
                <Input
                  type="url"
                  defaultValue={location?.google_maps_link || ''}
                  className="max-w-2xl w-full bg-white"
                  placeholder="https://maps.google.com/..."
                  name="google_maps_link"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Embed do Google Maps</Label>
                <Textarea
                  defaultValue={location?.google_maps_embed || ''}
                  rows={4}
                  className="max-w-3xl w-full bg-white"
                  placeholder="Código de incorporação do Google Maps"
                  name="google_maps_embed"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="services" className="mb-2">
              Seus serviços
            </Label>
          </div>
          <ServiceSelector id={member.id} onChange={handleServicesChange} />
        </div>

        <div>
          <div className="flex w-full justify-between items-center mb-4">
            <Label htmlFor="images">Suas fotos</Label>
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              <FaPlus /> Adicionar foto
            </Button>
          </div>

          <div className="w-full grid grid-cols-3 gap-4">
            {images && images.map(image => (
              <div key={image.name} className="relative">
                <FaX
                  className="absolute right-0 m-2 p-1 text-white bg-black rounded-full shadow-md hover:cursor-pointer"
                  onClick={() => handleRemoveImage(image)}
                />
                <Image
                  src={image.url || URL.createObjectURL(filesToUpload.find(f => f.name === image.name)!)}
                  alt={image.name}
                  width={500}
                  height={500}
                  className="object-cover"
                />
              </div>
            ))}

            {images.length === 0 && (
              <p className="text-muted-foreground">Nenhuma imagem adicionada</p>
            )}

            <input
              type="file"
              multiple
              hidden
              ref={fileInputRef}
              onChange={e => {
                const selectedFiles = Array.from(e.target.files || [])
                setFilesToUpload(prev => [...prev, ...selectedFiles])
                setImages(prev => [
                  ...prev,
                  ...selectedFiles.map(f => ({ name: f.name, url: '' })),
                ])
              }}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/dashboard/meus-locais')}
          >
            Voltar
          </Button>
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </div>
  )
}

export default EditarPage
