'use client'
import React, { useEffect, useState } from 'react'
import { getAllServices } from '@/service/servicesServices'
import { Service } from '@/model/Service'
import iconsMap from '@/lib/iconsMap'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { getAllCities } from '@/service/locationServices'
import { Button } from '../ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Filter, X, ChevronDown } from 'lucide-react'

interface FilterProps {
    selectedFilters: string[];
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterComponent: React.FC<FilterProps> = ({ selectedFilters, setSelectedFilters }) => {
    const [services, setServices] = useState<Service[]>([])
    const [cities, setCities] = useState<any[]>([])
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    function handleFilterChange(value: string, checked: boolean) {
        if (checked) {
            setSelectedFilters(prev => [...prev, value]);
        }
        else {
            setSelectedFilters(prev => prev.filter(item => item !== value));
        }
    }

    function clearAllFilters() {
        setSelectedFilters([])
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
            if (data) setCities(data)
        }
        fetchCities()
    }, [])

    if (!services.length) return null

    const filterContent = (
        <>
            <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-xl font-bold'>Filtros</h1>
                    {selectedFilters.length > 0 && (
                        <span className='bg-[var(--main-color)] text-white text-xs font-semibold px-2 py-1 rounded-full'>
                            {selectedFilters.length}
                        </span>
                    )}
                </div>
                {selectedFilters.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className='text-xs text-gray-600 hover:text-gray-900'
                    >
                        <X className='w-3 h-3 mr-1' />
                        Limpar
                    </Button>
                )}
            </div>
            <p className='text-sm text-[#707070] mb-4'>Filtre sua pesquisa</p>
            <hr className='mb-4' />
            <div className='flex flex-col gap-6'>
                <Accordion type="multiple" defaultValue={['services', 'states', 'cities']} className='w-full'>
                    <AccordionItem value="services">
                        <AccordionTrigger className='text-base font-semibold py-2'>
                            Serviços
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='flex flex-col gap-2 pt-2'>
                                {services.map((service) => {
                                    const Icon = iconsMap[service.icon as keyof typeof iconsMap];
                                    const isChecked = selectedFilters.includes(service.name);
                                    return (
                                        <div key={service.id} className='flex flex-row items-center gap-3 hover:bg-gray-50 rounded-md p-1 transition-colors'>
                                            <Checkbox 
                                                id={`service-${service.id}`} 
                                                checked={isChecked}
                                                onCheckedChange={(checked) => handleFilterChange(service.name, checked as boolean)} 
                                            />
                                            <Label 
                                                htmlFor={`service-${service.id}`} 
                                                className='flex items-center gap-2 cursor-pointer flex-1'
                                            >
                                                {Icon && <Icon className='w-4 h-4 text-[var(--main-color)]' />}
                                                <span className='text-sm'>{service.name}</span>
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="states">
                        <AccordionTrigger className='text-base font-semibold py-2'>
                            Estados
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='flex flex-col gap-2 pt-2'>
                                {['São Paulo', 'Minas Gerais'].map((state) => {
                                    const isChecked = selectedFilters.includes(state);
                                    return (
                                        <div key={state} className='flex flex-row items-center gap-3 hover:bg-gray-50 rounded-md p-1 transition-colors'>
                                            <Checkbox 
                                                id={`state-${state}`} 
                                                checked={isChecked}
                                                onCheckedChange={(checked) => handleFilterChange(state, checked as boolean)} 
                                            />
                                            <Label 
                                                htmlFor={`state-${state}`} 
                                                className='flex items-center gap-2 cursor-pointer flex-1'
                                            >
                                                <span className='text-sm'>{state}</span>
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="cities">
                        <AccordionTrigger className='text-base font-semibold py-2'>
                            Cidades
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='flex flex-col gap-2 pt-2 max-h-[300px] overflow-y-auto'>
                                {cities.length > 0 ? (
                                    cities.map((city, idx) => {
                                        const cityName = typeof city === 'string' ? city : city.name || city;
                                        const isChecked = selectedFilters.includes(cityName);
                                        return (
                                            <div key={`city-${idx}`} className='flex flex-row items-center gap-3 hover:bg-gray-50 rounded-md p-1 transition-colors'>
                                                <Checkbox 
                                                    id={`city-${idx}`} 
                                                    checked={isChecked}
                                                    onCheckedChange={(checked) => handleFilterChange(cityName, checked as boolean)} 
                                                />
                                                <Label 
                                                    htmlFor={`city-${idx}`} 
                                                    className='flex items-center gap-2 cursor-pointer flex-1'
                                                >
                                                    <span className='text-sm'>{cityName}</span>
                                                </Label>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p className='text-sm text-gray-500 py-2'>Nenhuma cidade disponível</p>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )

    return (
        <>
            {/* Desktop Version */}
            <div className='hidden sm:flex flex-col gap-4 basis-1/4 min-w-[280px] bg-[#fff] max-h-[calc(100vh-3rem)] rounded-xl shadow-sm py-6 px-6 sticky top-4 overflow-y-auto'>
                {filterContent}
            </div>

            {/* Mobile Version */}
            <div className='sm:hidden w-full'>
                <Button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    variant="outline"
                    className='w-full justify-between bg-white shadow-sm'
                >
                    <div className='flex items-center gap-2'>
                        <Filter className='w-4 h-4' />
                        <span className='font-semibold'>Filtros</span>
                        {selectedFilters.length > 0 && (
                            <span className='bg-[var(--main-color)] text-white text-xs font-semibold px-2 py-0.5 rounded-full'>
                                {selectedFilters.length}
                            </span>
                        )}
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMobileOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {isMobileOpen && (
                    <div className='mt-2 bg-[#fff] rounded-xl shadow-sm py-4 px-4'>
                        {filterContent}
                    </div>
                )}
            </div>
        </>
    )
}

export default FilterComponent

