import React from 'react';

import iconsMap from '../../lib/iconsMap';
import { Service } from '../../model/Service';

const ServiceTag = (serviceobject: Service) => {
    const Icon = iconsMap[serviceobject.icon as keyof typeof iconsMap];
    if (!Icon) return <p>Ícone não encontrado</p>;

    return (
        <div className='flex flex-col py-2 px-2 mb-4 max-w-[25rem] bg-[#e9e9e9] rounded-xl shadow-md'>
            <div className='flex text-xl items-center flex-row gap-2'>
                <p className='font-bold'>{serviceobject.name}</p>
                <Icon />
            </div>
            <div>
                <p className='text-left'>{serviceobject.description}</p>
            </div>
        </div>
    );
};

export default ServiceTag;
