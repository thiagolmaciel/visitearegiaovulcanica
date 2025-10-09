import React from 'react';

import iconsMap from '@/lib/iconsMap';
import { Service } from '@/model/Service';

interface ServiceOptionProps {
    serviceobject: Service;
    onMember: boolean;
}

const ServiceOption: React.FC<ServiceOptionProps> = ({ serviceobject, onMember }) => {
    const Icon = iconsMap[serviceobject.icon as keyof typeof iconsMap];
    if (!Icon) return <p>Ícone não encontrado</p>;

    return (
        <div
            className={`flex px-3 py-2 h-max w-max items-center justify-center shadow-md border-1 border-zinc-300 rounded-full gap-2 ${onMember ? "bg-[var(--main-color)] text-white" : "bg-zinc-100"} cursor-pointer hover:-translate-y-1 transition-all ease-in-out`}
        >
            <div><Icon></Icon></div>
            <div>{serviceobject.name}</div>
        </div>
    );
};

export default ServiceOption;