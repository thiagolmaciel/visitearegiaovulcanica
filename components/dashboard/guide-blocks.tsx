import React from 'react'
import { FaUser } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

const links = [
    {
        name: 'Gerenciar meus locais',
        description: 'Por aqui você pode configurar os seus locais, os editando, ou apagando',
        href: '/dashboard/meus-locais',
        icon: <FaHouse size={20}/>
    },
    {
        name: 'Gerenciar meu perfil',
        description:'Por aqui você pode configurar o seu perfil público e as informações que você exibe',
        href: '/dashboard/perfil',
        icon: <FaUser />
    }
]

const GuideBlocks = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {links.map((link, index) => (
                <Link key={index} href={link.href}>
                    <Card className='group h-full cursor-pointer hover:-translate-y-2 hover:shadow-lg border-2 border-transparent hover:border-[var(--main-color)]/20 transition-all ease-in-out duration-300 bg-white'>
                        <CardHeader className='pb-3'>
                            <div className='flex items-start gap-4'>
                                <div className='w-12 h-12 bg-[var(--main-color)]/10 rounded-lg flex items-center justify-center group-hover:bg-[var(--main-color)]/20 transition-colors'>
                                    <div className='text-[var(--main-color)] group-hover:scale-110 transition-transform'>
                                        {link.icon}
                                    </div>
                                </div>
                                <div className='flex-1'>
                                    <CardTitle className='text-lg mb-2 group-hover:text-[var(--main-color)] transition-colors'>
                                        {link.name}
                                    </CardTitle>
                                    <CardDescription className='text-sm leading-relaxed'>
                                        {link.description}
                                    </CardDescription>
                                </div>
                                <div className='text-gray-400 group-hover:text-[var(--main-color)] transition-colors'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default GuideBlocks
