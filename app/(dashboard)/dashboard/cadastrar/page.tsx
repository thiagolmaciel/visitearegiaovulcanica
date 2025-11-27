'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FaPlus, FaX } from 'react-icons/fa6'
import Image from 'next/image'
import { simpleToast } from '@/utils/simple-toast'
import { slugify } from '@/utils/slugify'
import { ImageModel } from '@/model/ImageModel'
import InfoTag from '@/components/dashboard/info-tag'
import ServiceSelectorCreate from '@/components/dashboard/service-selector-create'
import { createMember, getMemberByID } from '@/service/memberServices'
import { Member, MemberWithProfileID } from '@/model/Member'
import { createImages } from '@/service/imagesServices'
import { createMemberServices } from '@/service/servicesServices'
import { getUserId } from '@/service/userServices'
import { createClient } from '@/lib/supabase/client'

const CadastrarPage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null);
  const [images, setImages] = useState<ImageModel[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])  
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const supabase = await createClient();
        const { data, error } = await supabase.auth.getClaims();
        if (error || !data?.claims) {
          router.push("/auth/login");
        }
        const id_user = data?.claims?.sub
        if(!id_user){
          router.push('/dashboard/meus-locais')
          simpleToast('Erro ao obter o ID do usuário', 'error')
          return
        }
        setUserId(id_user)
      }catch(error){
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  function handleServicesChange(services: string[]) {
    setSelectedServices(services);
  }

  async function handleRemoveImage(image: ImageModel) {
    setImages(prev => prev.filter(img => img !== image))
    setFilesToUpload(prev => prev.filter(f => f.name !== image.name))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const form = new FormData(e.currentTarget)
    if (!form) {
      simpleToast('Erro no formulário', 'error')
      setLoading(false)
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

    if(!userId){
      router.push('/dashboard/meus-locais')
      simpleToast('Erro ao obter o ID do usuário', 'error')
      return
    }

    const profile_id = userId

    const member: MemberWithProfileID = {
      name,
      description,
      email,
      whatsapp,
      phone,
      instagram,
      facebook,
      website,
      slug,
      image: '',
      location_id: null,
      profile_id: profile_id
    }

    if (!name || !description || !email) {
      simpleToast('Nome, descrição e email são obrigatórios', 'error')
      setLoading(false)
      return
    }

    try {
      console.log('Dados do formulário:', {
        name,
        description,
        email,
        whatsapp,
        phone,
        instagram,
        facebook,
        website,
        slug,
        selectedServices,
        filesToUpload: filesToUpload.length,
        profile_id: profile_id
      })

      
        const newMember = await createMember(member) 
        await getMemberByID(newMember.id)
      await createImages(newMember.id, filesToUpload);
       await createMemberServices(newMember.id, selectedServices);
      
      
      await new Promise(resolve => setTimeout(resolve, 1000))

      router.push('/dashboard/meus-locais')
      simpleToast('Local cadastrado com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao cadastrar local:', error)
      simpleToast('Erro ao cadastrar local', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <InfoTag message="Cadastre aqui seu novo local" />
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-xl">Novo Agriturismo</h2>
        <p className="text-muted-foreground">
          Preencha todas as informações do seu local. Todas estas informações serão públicas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-1 flex-col gap-6 flex-grow">
          <div className="flex flex-col gap-3">
            <Label>Nome *</Label>
            <Input
              type="text"
              className="max-w-2xl w-full"
              placeholder="Nome do local"
              name="name"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Descrição *</Label>
            <Textarea
              rows={15}
              className="max-w-3xl w-full"
              placeholder="Descrição do local"
              name="description"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Email *</Label>
            <Input
              type="email"
              className="max-w-2xl w-full"
              placeholder="Email do local"
              name="email"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Whatsapp</Label>
            <Input
              type="text"
              className="max-w-2xl w-full"
              placeholder="Whatsapp do local"
              maxLength={11}
              name="whatsapp"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Telefone</Label>
            <Input
              type="text"
              className="max-w-2xl w-full"
              placeholder="Telefone do local"
              maxLength={10}
              name="phone"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Instagram</Label>
            <Input
              type="text"
              className="max-w-2xl w-full"
              placeholder="instagram.com/meulocal"
              name="instagram"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Facebook</Label>
            <Input
              type="text"
              className="max-w-2xl w-full"
              placeholder="Facebook do local"
              name="facebook"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Website</Label>
            <Input
              type="text"
              className="max-w-2xl w-full"
              placeholder="site.com.br"
              name="website"
            />
          </div>
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="services" className="mb-2">
              Seus serviços
            </Label>
          </div>
          <ServiceSelectorCreate onChange={handleServicesChange} />
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
            disabled={loading}
          >
            Voltar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar local'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CadastrarPage
