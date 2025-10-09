'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import InfoTag from '@/components/dashboard/info-tag'
import { getMembersByProfileID } from '@/service/profileServices'
import { Member } from '@/model/Member'
import { getMemberByID, updateMember } from '@/service/memberServices'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { simpleToast } from '@/utils/simple-toast'
import { slugify } from '@/utils/slugify'
import { Button } from '@/components/ui/button'
import { getImagesByID, updateImages } from '@/service/imagesServices'
import { ImageModel } from '@/model/ImageModel'
import Image from 'next/image'
import { stringify } from 'querystring'
import { FaX } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa'

const EditarPage = () => {
  const params = useParams() // aqui sem generics
  const router = useRouter()
  const [member, setMember] = useState<Member | null>(null)
  const [images, setImages] = useState<ImageModel[]>([])
  const [loading, setLoading] = useState(true)
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<ImageModel[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null);


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
      } catch (error) {
        router.push('/dashboard/meus-locais')
        simpleToast('Erro ao carregar dados', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    setLoading(false)
    simpleToast(JSON.stringify(images))
  }, [params?.id, router])

  if (loading || !member) {
    return <p>Carregando...</p>
  }

  //Edit function

  async function handleRemoveImage(image: ImageModel) {
    setImages(prev => prev.filter(img => img !== image))

    if (image.url) {
      setImagesToDelete(prev => [...prev, image])
    }
  
    // If it’s a newly added file, remove it from filesToUpload
    setFilesToUpload(prev => prev.filter(f => f.name !== image.name))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form == null || member == null) {
      simpleToast('Erro')
      return null;
    }

    const name = form.get('name') as string
    const description = form.get('description') as string
    const email = form.get('email') as string
    const whatsapp = form.get('whatsapp') as string
    const phone = form.get('phone') as string
    const instagram = form.get('instagram') as string
    const facebook = form.get('facebook') as string
    const website = form.get('website') as string
    const slug = slugify(name) // Checar se slug existe, depois IMPORTANTE

    const updatedMember: Member = {
      id: member.id,
      name: name,
      description: description,
      email: email,
      whatsapp: whatsapp,
      phone: phone,
      instagram: instagram,
      facebook: facebook,
      website: website,
      slug: slug,
      location_id: member.location_id,
      image: member.image
    };

    try {
      await updateMember(updatedMember)
      await updateImages(member.id, filesToUpload, imagesToDelete)
      router.push('/dashboard/meus-locais')
      simpleToast('Local atualizado com sucesso', 'success')
    }
    catch (error) {
      simpleToast('Erro ao atualizar local', 'error')
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <InfoTag message="Edite aqui seu local" />
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-xl">{member.name}</h2>
        <p className='text-muted-foreground'>Edite cautelosamente as informações do seu local. Todas estas informações serão públicas</p>
      </div>
      
      <div className='flex flex-col gap-8 min-h-[30rem]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div className='flex flex-1 flex-col gap-6 flex-grow'>
            <div className='flex flex-col gap-3'>
              <Label>Nome</Label>
              <Input
                type="text"
                defaultValue={member.name}
                className='max-w-2xl w-full'
                placeholder='Nome do local'
                name='name'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Descrição</Label>
              <Textarea
                defaultValue={member.description}
                rows={15}
                className='max-w-3xl w-full'
                placeholder='Descrição do local'
                name='description'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Email</Label>
              <Input
                type="text"
                defaultValue={member.email}
                className='max-w-2xl w-full'
                placeholder='Email do local'
                name='email'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Whatsapp</Label>
              <Input
                type="text"
                defaultValue={member.whatsapp}
                className='max-w-2xl w-full'
                placeholder='Whatsapp do local'
                maxLength={11}
                name='whatsapp'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Telefone</Label>
              <Input
                type="text"
                defaultValue={member.phone}
                className='max-w-2xl w-full'
                placeholder='Telefone do local'
                maxLength={10}
                name='phone'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Instagram</Label>
              <Input
                type="text"
                defaultValue={member.instagram}
                className='max-w-2xl w-full'
                placeholder='Instagram do local ex: instagram.com/meulocal'
                name='instagram'
              />
              <div className='flex flex-col gap-3'>
                <Label>Facebook</Label>
                <Input
                  type="text"
                  defaultValue={member.facebook}
                  className='max-w-2xl w-full'
                  placeholder='Facebook do local'
                  name='facebook'
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Label>Website</Label>
                <Input
                  type="text"
                  defaultValue={member.website}
                  className='max-w-2xl w-full'
                  placeholder='Insira seu site ex:site.com.br'
                  name='website'
                />
              </div>

            </div>
        </div>
       <div>
         <div className='flex w-full justify-between items-center mb-4'>
          <Label htmlFor="images">Suas fotos</Label>
         <Button type='button'
           onClick={() => fileInputRef.current?.click()}
           ><FaPlus />Adicionar foto</Button>
         </div>
         <div className='w-full grid grid-cols-3 gap-4'>
             {images && images.map((image) => (
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
              <p className='text-muted-foreground'>Nenhuma imagem adicionada</p>
             )
            }
             <input type="file" multiple hidden ref={fileInputRef}
             onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || [])
              setFilesToUpload(prev => [...prev, ...selectedFiles])
              setImages(prev => [
                ...prev,
                ...selectedFiles.map(f => ({ name: f.name, url: "" }))
              ])
            }} />
           </div>
       </div>
        <Button type='submit'>Salvar alterações</Button>
        </form>
      </div>
    </div>
  )
}

export default EditarPage
