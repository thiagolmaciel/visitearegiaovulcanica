'use client'
import React, { useEffect, useState } from 'react'
import { getAllServices } from '@/service/servicesServices'
import { Service } from '@/model/Service'
import iconsMap from '@/lib/iconsMap'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { getAllCities } from '@/service/locationServices'

interface FilterProps {
    selectedFilters: string[];
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterComponent: React.FC<FilterProps> = ({ selectedFilters, setSelectedFilters }) => {
    const [services, setServices] = useState<Service[]>([])
    const [cities, setCities] = useState<any[]>([])

    function handleFilterChange(value: string, checked: boolean) {
        if (checked) {
            setSelectedFilters(prev => [...prev, value]);
        }
        else {
            setSelectedFilters(prev => prev.filter(item => item !== value));
        }
    }

    useEffect(() => {
        async function fetchServices() {
            const data = await getAllServices()
            if (data) setServices(data)
        }
        fetchServices()
    }, [])

    useEffect(() => {
        async function fetchCities() {
            const data = await getAllCities()
            console.log(data)

            if (data) setCities(data)
        }
        fetchCities()
    }, [])

    if (!services.length) return null

    return (
        <div className='hidden sm:flex flex-col gap-4 basis-1/5 bg-[#fff] h-max rounded-xl shadow-sm py-6 px-6'>
            <div>
                <h1 className='text-xl font-bold'>Filtro</h1>
                <h2 className='text-[#707070]'>Filtre sua pesquisa</h2>
            </div>
            <hr />
            <div className='flex flex-col gap-6 '>
                <div className='flex flex-col gap-3'>
                    <p className='font-semibold'>Serviços</p>
                    <div className='flex flex-col gap-2'>
                        {services.map((service) => {
                            const Icon = iconsMap[service.icon as keyof typeof iconsMap];
                            return (
                                <div key={service.id} className='flex flex-row items-center gap-3'>
                                    <Checkbox id={service.id.toString()} onCheckedChange={(checked) => handleFilterChange(service.name, checked as boolean)} />
                                    <Label htmlFor={service.id.toString()} className='flex items-center gap-2'>
                                        <Icon ></Icon>
                                        {service.name}
                                    </Label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='font-semibold'>Estados</p>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row items-center gap-3'>
                            <Checkbox id="São Paulo" onCheckedChange={(checked) => handleFilterChange('São Paulo', checked as boolean)} />
                            <Label htmlFor="São Paulo" className='flex items-center gap-2' >
                                São Paulo
                            </Label>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <Checkbox id="Minas Gerais" onCheckedChange={(checked) => handleFilterChange('Minas Gerais', checked as boolean)} />
                            <Label htmlFor="Minas Gerais" className='flex items-center gap-2'>
                                Minas Gerais
                            </Label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='font-semibold'>Cidades</p>
                    <div className='flex flex-col gap-2'>
                        {cities.map((city, idx) => (
                            <div key={city + idx} className='flex flex-row items-center gap-3'>
                                <Checkbox id={city + idx} onCheckedChange={(checked) => handleFilterChange(city, checked as boolean)} />
                                <Label htmlFor={city + idx} className='flex items-center gap-2'>
                                    {city}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterComponent

