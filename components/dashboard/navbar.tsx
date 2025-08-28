import Image from 'next/image'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { IoIosNotifications } from 'react-icons/io'
import { FaHamburger } from 'react-icons/fa'
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi'
import { createClient } from '@/lib/supabase/client'


const Navbar = () => {
  return (
    <div className='h-24 w-full p-standard flex items-center justify-between gap-5 '>
      <div className='relative h-full w-24 '>
        <Image src='/logo_dashboard.png' alt='logo' fill className='absolute object-contain'></Image>
      </div>
      <div className='flex items-center gap-5 md:gap-10 text-base '>
  
        <Link href={'/'} className='hidden md:flex border-b-2 border-[var(--main-color)]'>Home</Link>
        <Link href={'/'} className='hidden md:flex'>Meus locais</Link>
        <Link href={'/'} className='hidden md:flex'>Perfil</Link>
        <IoIosNotifications size={22} className='cursor-pointer' />        
        <div className='relative h-10 w-10 bg-red-500 rounded-full overflow-clip shadow-md hover:ring-2 hover:ring-gray-300 transition-all ease-in-out cursor-pointer'>
          <Image alt='avatar' src={'/avatar.png'} fill className='absolute object-cover' />
        </div> 
        <GiHamburgerMenu className='md:hidden flex' size={20}/>
      </div>
    </div>
  )
}

export default Navbar
