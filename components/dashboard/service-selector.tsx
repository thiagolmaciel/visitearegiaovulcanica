'use client'

import { Service } from "@/model/Service"
import { getMemberServices } from "@/service/memberServices"
import { getAllServices } from "@/service/servicesServices"
import { useEffect, useState } from "react"
import ServiceOption from "./service-option"

type serviceSelectorProps = {
    id: string | undefined,
    onChange?: (services: string[]) => void
}



const ServiceSelector: React.FC<serviceSelectorProps> = ({ id, onChange }) => {
    const [services, setServices] = useState<Service[]>([])
    const [memberServices, setMemberServices] = useState<Service[]>([])
    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) {
            return
        }
        const fetchData = async () => {
            const services = await getAllServices();
            setServices(services ?? []);
            const memberServices = await getMemberServices(id);
            setMemberServices(memberServices ?? []);
            setLoading(false);
            setSelectedServices(memberServices ?? []);
            onChange?.(memberServices?.map(service => service.id ?? []))
            console.log(memberServices)
            console.log(services)
        }
        fetchData()
    }
        , [id])

    const handleSelect = (id: string) => {
        let updated: Service[];

        if(memberServices.some(service => service.id === id)){
            updated = memberServices.filter(service => service.id !== id);
        }
        else{
            const selectedService = services.find(service => service.id === id);
            if (selectedService) {
                updated = [...memberServices, selectedService];
            }
            else{
                return
            }
        }
        setMemberServices(updated);
        onChange?.(updated.map(s => s.id))
    }

    if (loading) {
        return <div className="loading">aa</div>
        }

    return (
        <div className="flex justify-between flex-wrap gap-4">
            {services.map((service) => {
                return(
                    <div key={service.id}> 
                        <ServiceOption 
                            serviceobject={service} 
                            onMember={memberServices.some(ms => ms.id  === service.id)}
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

export default ServiceSelector
