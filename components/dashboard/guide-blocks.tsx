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
        <div className='flex flex-col sm:flex-row gap-6'>
            {links.map((link, index) => (
                <div key={index}>
                    <Link href={link.href}>
                        <Card className='flex max-w-sm w-full max-h-svh h-full cursor-pointer hover:-translate-y-3 hover:bg-zinc-100  transition-all ease-in-out'>
                            <div className='flex flex-col items-center justify-center space-y-1.5 pl-6'>
                            {link.icon}
                            </div>
                            <CardHeader>
                                <CardTitle>{link.name}</CardTitle>
                                <CardDescription>{link.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default GuideBlocks
