import React, { useEffect, useState } from 'react'
import { getAllServices } from '../../service/servicesServices'
import { Service } from '../../model/Service'
import iconsMap from '../../lib/iconsMap'

const FilterComponent = () => {
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        async function fetchServices() {
            const data = await getAllServices()
            if (data) setServices(data)
        }
        fetchServices()
    }, [])

    if (!services.length) return null

    return (
        <div className="hidden sm:visible sm:flex flex-col gap-4 items-start sm:flex-1 px-[2rem] py-[2rem] h-[40rem] bg-[#fff] rounded-2xl shadow-lg">
            <div className='flex flex-col gap-2 w-full text-xl font-bold'>
                <p>Filtre por:</p>
                <div className="hline w-full bg-green-50 mb-0!"></div>
            </div>
            <div>
                <p className='text-x font-bold mb-2'>Categoria</p>
                <fieldset>
                    {services.map((service) => {
                        const Icon = iconsMap[service.icon as keyof typeof iconsMap];
                        return (
                            <div key={service.id} className="flex items-center gap-2 text-[#3f3f3f]">
                                <input type="radio" value={service.id} id={`service-${service.id}`} className='accent-[var(--main-color)]' />
                                <label htmlFor={`service-${service.id}`}>{service.name}</label>
                                <Icon />
                            </div>
                        )
                    })}
                </fieldset>
            </div>
        </div>
    )
}

export default FilterComponent
