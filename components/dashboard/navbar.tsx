'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { IoIosNotifications } from 'react-icons/io'
import { MdMoreVert } from 'react-icons/md'
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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    <div className='h-20 w-full px-4 sm:px-8 lg:px-16 flex items-center justify-center gap-5 relative bg-white border-b border-gray-200 shadow-sm'>
      <div className='flex items-center justify-between w-full max-w-[95rem]'>
        {/* Left side - Logo */}
        <div className='flex items-center justify-center h-full w-24 flex-shrink-0'>
          <Image src='/logo_dashboard.png' alt='logo' width={480} height={800} className='object-contain'></Image>
        </div>
        
        {/* Center - Navigation Links */}
        <div className='hidden md:flex items-center gap-2 flex-1 justify-center'>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pathname === link.href 
                  ? 'bg-[var(--main-color)] text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {/* Right side - Notifications and Menu */}
        <div className='flex items-center gap-4 flex-shrink-0'>
        <button 
          onClick={testToast}
          className='relative p-2 rounded-lg hover:bg-gray-100 transition-colors'
          aria-label="Notificações"
        >
          <IoIosNotifications size={22} className='text-gray-600' />
        </button>
        
        {/* Three Dots Menu - Desktop only */}
        {isMounted && (
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
                  <MdMoreVert size={24} className='text-gray-600' />
                </button>
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
        )}

        {/* Mobile Menu Button - Triggers mobile menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
            aria-label="Menu"
          >
            <MdMoreVert size={24} className='text-gray-600' />
          </button>
        </div>
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
