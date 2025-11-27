import React from 'react'
import { Member } from '@/model/Member'

import { formatPhone } from '@/utils/stringUtils'
import iconsMap from '@/lib/iconsMap'
import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BiWorld } from 'react-icons/bi'


const ContactTag = (icon: keyof typeof iconsMap, title:string ) => {
    const Icon = iconsMap[icon];
    return (
        <div  className='flex flex-row gap-4 items-center'>
        <p><Icon /></p>
        <p>{title}</p>
        </div>
    )
}

const ContactArea = (member: Member) => {

    return (
        <div>
            {/* <div role='whatsapp' className='flex items-center gap-4 w-full px-2 py-2 text-xl rounded-xl text-white font-bold bg-[var(--main-color)] justify-center'>
                <p>Enviar Mensagem</p> <FaWhatsapp />
            </div> */}
            <div className='flex flex-col gap-3 w-full'>
                <p className='text-xl font-bold'>Contato</p>
                <ul className='flex flex-col sm:flex-col sm:gap-3 gap-5 w-full'>
                    {member.phone && (
                        <li className='flex flex-row gap-4 items-center w-full min-w-0'><FaPhone className='flex-shrink-0' /> <p className='break-words break-all min-w-0 flex-1'>{formatPhone(member.phone)}</p></li>

                    )
                    }
                    {member.whatsapp && (
                        <li className='flex flex-row gap-4 items-center w-full min-w-0'><FaWhatsapp className='flex-shrink-0' /> <p className='break-words break-all min-w-0 flex-1'>{formatPhone(member.whatsapp)}</p></li>
                    )
                    }
                    {member.email && (
                        <li className='flex flex-row gap-4 items-center w-full min-w-0'><MdEmail className='flex-shrink-0' /> <p className='break-words break-all min-w-0 flex-1'>{member.email}</p></li>
                    )
                    }
                </ul>
                <div className="hline !mb-0" />
                <ul className='flex flex-col sm:flex-row gap-4 sm:gap-8 w-full'>
                    {member.instagram && (
                        <li className='w-full sm:w-auto'> <a href={member.instagram} target="_blank" className='flex flex-row gap-4 items-center'><FaInstagram className='flex-shrink-0' /><p>Instagram</p></a></li>
                    )
                    }
                    {member.facebook && (
                        <li className='w-full sm:w-auto'><a href={member.facebook} target="_blank" className='flex flex-row gap-4 items-center'><FaFacebook className='flex-shrink-0' /> <p>Facebook</p></a></li>
                    )
                    }
                </ul>
                {member.website && (
                    <>
                    <div className="hline !mb-0" />
                    <span className='w-full min-w-0'>
                        <a href={member.website} target="_blank" className='flex flex-row gap-4 items-center w-full min-w-0'>
                            <BiWorld className='flex-shrink-0' />
                            <p className='break-words min-w-0 flex-1'>Visite o Site!</p>
                        </a>
                    </span>
                    </>
                )}
            </div>
        </div>
    )
}

export default ContactArea
