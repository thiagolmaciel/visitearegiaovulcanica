'use client'

import { Service } from "@/model/Service"
import { getMemberServices } from "@/service/memberServices"
import { getAllServices } from "@/service/servicesServices"
import { useEffect, useState } from "react"
import ServiceOption from "./service-option"

type serviceSelectorProps = {
    id: string
}



const ServiceSelector: React.FC<serviceSelectorProps> = ({ id }) => {
    const [services, setServices] = useState<Service[]>([])
    const [memberServices, setMemberServices] = useState<Service[]>([])
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
            console.log(memberServices)
            console.log(services)
        }
        fetchData()
    }
        , [id])

    if (loading) {
        return <div className="loading">aa</div>
        }

    return (
        <div className="flex flex-wrap gap-4">
            {services.map((service) => {
                return(
                    <div key={service.id}> 
                        <ServiceOption serviceobject={service} onMember={memberServices.some(ms => ms.id  === service.id)}/>
                    </div>
                )
            })}
        </div>
    )

}

export default ServiceSelector
