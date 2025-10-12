'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface CreateMemberProps {
  id: string;
  onUpdate?: () => void; 
}

const CreateMemberButton = ({id, onUpdate}: CreateMemberProps) => {
  const router = useRouter()

  function handleCreateMember() {
    router.push('/dashboard/cadastrar')
  }

  return (
    <Button onClick={handleCreateMember}>
      Criar agriturismo
    </Button>
  )
}

export default CreateMemberButton
