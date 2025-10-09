'use client'
import React, { useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import ConfirmDialog from './confirm-dialog'
import { deleteMemberById } from '@/service/memberServices'
import { Button } from '../ui/button'
import { FaPen, FaTrash } from 'react-icons/fa'
import EditMemberButton from './edit-member-button'

interface OptionsButtonProps {
    member_id: string
    member_name: string
    onUpdate?: () => void;
}
const OptionsButton = ({ member_id, member_name, onUpdate }: OptionsButtonProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    async function handleDelete() {
        try {
            await deleteMemberById(member_id) // aguarda a exclusão
            onUpdate?.()
        } catch (error) {
            throw error
        }
    }


    return (
        <>

            <div className='hidden sm:flex'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='flex items-center justify-center rounded-lg h-8 w-5 shadow-md cursor-pointer hover:bg-muted'>
                        <SlOptionsVertical className='text-muted-foreground' />
                    </DropdownMenuTrigger >
                    <DropdownMenuContent >
                        <DropdownMenuLabel>Opções</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className='focus:outline-none focus:ring-0 cursor-pointer'>
                             <Link href={`editar/${member_id}`}>
                                                        <p>Editar</p>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className='focus:outline-none focus:ring-0 cursor-pointer'>
                            <div onClick={() => setDialogOpen(true)}>
                                <p>Deletar</p>
                            </div>
                        </DropdownMenuItem>

                    </DropdownMenuContent>2
                    <ConfirmDialog open={dialogOpen}
                        onClose={(confirmed) => {
                            setDialogOpen(false)
                            if (confirmed) handleDelete()
                        }}
                        description={'Deseja realmente deletar o membro ' + member_name + '?'}>
                    </ConfirmDialog>
                </DropdownMenu>
            </div>
            <div className='flex sm:hidden'>
                <ul className='flex flex-row w-full justify-between'>
                    <li>
                        <Button className='flex'>
                            <FaPen />
                            Editar
                        </Button>
                    </li>
                    <li>
                        <Button className='flex' open={dialogOpen}>
                            <FaTrash />
                            Deletar
                            </Button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default OptionsButton
