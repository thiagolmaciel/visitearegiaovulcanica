import React from 'react'
import { Member } from '../../model/Member'
import { FaWhatsapp } from 'react-icons/fa'

const ContactArea = (member: Member) => {
    return (
        <div>
            {/* <div role='whatsapp' className='flex items-center gap-4 w-full px-2 py-2 text-xl rounded-xl text-white font-bold bg-[var(--main-color)] justify-center'>
                <p>Enviar Mensagem</p> <FaWhatsapp />
            </div> */}
        </div>
    )
}

export default ContactArea
