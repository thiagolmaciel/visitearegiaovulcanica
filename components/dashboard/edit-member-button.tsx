'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/utils/slugify';
import { redirect, useRouter } from 'next/navigation';
import { simpleToast } from '@/utils/simple-toast';

interface CreateMemberProps {
  id: string;
  onUpdate?: () => void; 
}

const EditMemberButton = ({id, onUpdate}: CreateMemberProps) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    description: "",
    email: ""
  })
  const [status, setStatus] = useState("")

  const [whatsapp, setWhatsapp] = useState("")
  const [phone, setPhone] = useState("")


  function toggleForm() {
    setOpen(!open)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleWhatsappChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + " " + value.slice(2);
    }
    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8, 13);
    }

    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setWhatsapp(value);
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + " " + value.slice(2);
    }
    if (value.length > 6) {
      value = value.slice(0, 7) + "-" + value.slice(7, 11);
    }

    if (value.length > 11) {
      value = value.slice(0, 12);
    }

    setPhone(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Criando...")
    const supabase = createClient();
    const slug = slugify(form.name)
    const { data, error } = await supabase
      .from('members')
      .insert([{
        name: form.name,
        description: form.description,
        email: form.email,
        whatsapp: whatsapp,
        phone: phone,
        profile_id: id,
        slug: slug
    }
      ])

      if(error){
        setStatus(error.message)
      }
      else{
        setOpen(false)
        setForm({name: "", description: "", email: ""})
        setWhatsapp('')
        setPhone('')
        onUpdate?.()
        simpleToast('Local criado com sucesso', 'success')
      }

  }

  return (
    <div>
      <p onClick={toggleForm}>Editar</p>
      {open && (
        <div className='absolute top-0 left-0 inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-50 w-[100vw] h-[100vh]'>
          
            <Card className='max-w-2xl w-full'>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Crie seu agriturismo</CardTitle>
                  <CardDescription>Expanda e conquiste os visitantes!</CardDescription>
                </CardHeader>
                  <CardContent className='flex flex-col gap-6'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Nome</Label>
                      <Input placeholder='Nome do local' type='text' id='name' name='name' value={form.name}
                      onChange={handleChange}></Input>
                      
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Descrição</Label>
                      <Textarea placeholder='Descrição do local' id='description' name='description' value={form.description}
                        onChange={handleChange} ></Textarea>
                      <p className='text-muted-foreground text-sm'>Cative os visitantes com a sua descrição!</p>
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Email</Label>
                      <Input placeholder='Email de contato' type='email' id='name'
                       onChange={handleChange} ></Input>
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Whatsapp</Label>
                      <Input placeholder='Contato de Whatsapp'
                        type='tel'
                        id='whatsapp'
                        name='whatsapp'
                        value={whatsapp}
                        onChange={handleWhatsappChange}></Input>
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Telefone</Label>
                      <Input placeholder='Contato de celular'
                        type='tel'
                        id='telephone'
                        name='telephone'
                        value={phone}
                        onChange={handlePhoneChange}></Input>
                    </div>
                  </CardContent>
                <CardFooter className='flex justify-between'>
                  <Button onClick={toggleForm}>Voltar</Button>
                  <Button type='submit'>Criar</Button>
                </CardFooter>
                {status && <p className="text-center mt-2">{status}</p>}
              </form>  
              </Card>
        </div>
      )}
    </div>



  )
}

export default EditMemberButton
