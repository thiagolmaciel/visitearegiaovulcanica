import React from 'react'
import { IoOptions } from 'react-icons/io5'
import { SlOptionsVertical } from 'react-icons/sl'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { FaPen } from 'react-icons/fa'

interface OptionsButtonProps {
    member_id: string
}
const OptionsButton = ({ member_id }: OptionsButtonProps) => {
    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild className='flex items-center justify-center rounded-lg h-8 w-5 shadow-md cursor-pointer hover:bg-muted'>
                <SlOptionsVertical className='text-muted-foreground' />
            </DropdownMenuTrigger >
            <DropdownMenuContent >
                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className='focus:outline-none focus:ring-0 cursor-pointer'>
                    <Link href='/' className='w-full'>
                        <p>Editar</p>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='focus:outline-none focus:ring-0 cursor-pointer'>
                    <Link href='/' className='w-full'>
                        <p>Deletar</p>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default OptionsButton
