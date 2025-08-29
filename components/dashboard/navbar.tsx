'use client'
import Image from 'next/image'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { IoIosNotifications } from 'react-icons/io'
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi'
import { usePathname, useRouter } from 'next/navigation'
import { simpleToast } from '@/utils/simple-toast'
import { handleLogout } from '@/app/(auth)/auth/logout/logout'

function testToast(){
  simpleToast('Hello!', 'info')
}



const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const links = [
    { href: '/dashboard', label: 'Home' },
    { href: '/dashboard/meus-locais', label: 'Meus locais' },
    { href: '/dashboard/perfil', label: 'Perfil' },
  ]

  async function Logout(){
    await handleLogout();
    router.push('/auth/login')
  }
  return (
    <div className='h-24 w-full p-standard flex items-center justify-between gap-5 '>
      <div className='flex items-center justify-center h-full w-24 '>
        <Image src='/logo_dashboard.png' alt='logo' width={480} height={800} className='object-contain'></Image>
      </div>
      <div className='flex items-center gap-5 md:gap-10 text-base '>
      {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`hidden md:flex ${pathname === link.href ? 'border-b-2 border-[var(--main-color)]' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <IoIosNotifications size={22} className='cursor-pointer' onClick={testToast} />        
        <div className='relative h-10 w-10 bg-red-500 rounded-full overflow-clip shadow-md hover:ring-2 hover:ring-gray-300 transition-all ease-in-out cursor-pointer'>
          <Image alt='avatar' src={'/avatar.png'} fill className='absolute object-cover' onClick={Logout}/>
        </div> 
        <GiHamburgerMenu className='md:hidden flex' size={20}/>
      </div>
    </div>
  )
}

export default Navbar
