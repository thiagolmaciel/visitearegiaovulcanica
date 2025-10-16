'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { IoIosNotifications } from 'react-icons/io'
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'
import { usePathname, useRouter } from 'next/navigation'
import { simpleToast } from '@/utils/simple-toast'
import { handleLogout } from '@/app/(auth)/auth/logout/logout'

function testToast(){
  simpleToast('Hello!', 'info')
}



const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const links = [
    { href: '/dashboard', label: 'Home' },
    { href: '/dashboard/meus-locais', label: 'Meus locais' },
    { href: '/dashboard/perfil', label: 'Perfil' },
  ]

  async function Logout(){
    simpleToast('Deslogando...', 'info')
    await handleLogout();
    router.push('/auth/login')
  }
  return (
    <div className='h-24 w-full p-standard flex items-center justify-center gap-5 relative'>
      {/* Left side - Logo */}
      <div className='absolute left-4 flex items-center justify-center h-full w-24 '>
        <Image src='/logo_dashboard.png' alt='logo' width={480} height={800} className='object-contain'></Image>
      </div>
      
      {/* Center - Navigation Links */}
      <div className='hidden md:flex items-center gap-5 md:gap-10 text-base '>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`${pathname === link.href ? 'border-b-2 border-[var(--main-color)]' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      {/* Right side - Notifications and Avatar */}
      <div className='absolute right-4 flex items-center gap-5'>
        <IoIosNotifications size={22} className='cursor-pointer' onClick={testToast} />        
        
        {/* Avatar Dropdown - Desktop only */}
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='relative h-10 w-10 bg-red-500 rounded-full overflow-clip shadow-md hover:ring-2 hover:ring-gray-300 transition-all ease-in-out cursor-pointer'>
                <Image alt='avatar' src={'/avatar.png'} fill className='absolute object-cover'/>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer hover:text-white focus:text-white">
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:text-white focus:text-white" onClick={Logout}>
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Avatar - Triggers mobile menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='relative h-10 w-10 bg-red-500 rounded-full overflow-clip shadow-md hover:ring-2 hover:ring-gray-300 transition-all ease-in-out cursor-pointer'
          >
            <Image alt='avatar' src={'/avatar.png'} fill className='absolute object-cover'/>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full mobile style */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
          <div className="px-4 py-4 space-y-3">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md transition-colors ${
                  pathname === link.href ? 'bg-[var(--main-color)] text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-3">
              <button 
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Configurações
              </button>
              <button 
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  Logout()
                }}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
