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
    const [dropdownOpen, setDropdownOpen] = useState(false)

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
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger asChild className={`flex items-center justify-center rounded-lg h-8 w-5 shadow-md cursor-pointer ${dropdownOpen ? 'bg-gray-200' : 'bg-white'}`}>
                        <SlOptionsVertical className='text-muted-foreground' />
                    </DropdownMenuTrigger >
                    <DropdownMenuContent>
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

                    </DropdownMenuContent>
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
                <ul className='flex flex-row gap-2'>
                    <li>
                        <Button size="sm" variant="outline" className='flex items-center gap-1 bg-white border-gray-300'>
                            <FaPen size={12} />
                            Editar
                        </Button>
                    </li>
                    <li>
                        <Button size="sm" variant="outline" className='flex items-center gap-1 bg-white border-red-300 text-red-600 hover:bg-red-50' onClick={() => setDialogOpen(true)}>
                            <FaTrash size={12} />
                            Deletar
                        </Button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default OptionsButton
