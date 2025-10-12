'use client'

import { Service } from "@/model/Service"
import { getAllServices } from "@/service/servicesServices"
import { useEffect, useState } from "react"
import ServiceOption from "./service-option"

type serviceSelectorProps = {
    onChange?: (services: string[]) => void
}

const ServiceSelectorCreate: React.FC<serviceSelectorProps> = ({ onChange }) => {
    const [services, setServices] = useState<Service[]>([])
    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const allServices = await getAllServices();
            setServices(allServices ?? []);
            setLoading(false);
        }
        fetchData()
    }, [])

    const handleSelect = (serviceId: string) => {
        let updated: Service[];

        if(selectedServices.some(service => service.id === serviceId)){
            updated = selectedServices.filter(service => service.id !== serviceId);
        }
        else{
            const selectedService = services.find(service => service.id === serviceId);
            if (selectedService) {
                updated = [...selectedServices, selectedService];
            }
            else{
                return
            }
        }
        setSelectedServices(updated);
        onChange?.(updated.map(s => s.id))
    }

    if (loading) {
        return <div className="text-muted-foreground">Carregando serviços...</div>
    }

    return (
        <div className="flex justify-between flex-wrap gap-4">
            {services.map((service) => {
                return(
                    <div key={service.id}> 
                        <ServiceOption 
                            serviceobject={service} 
                            onMember={selectedServices.some(ms => ms.id === service.id)}
                            onClick={() => {
                                handleSelect(service.id)
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default ServiceSelectorCreate
