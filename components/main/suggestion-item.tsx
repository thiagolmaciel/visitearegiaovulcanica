'use client'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { abrevToName, truncateString } from "@/lib/textFunctions";
import { getCityByID } from "@/service/locationServices";
import { getMemberServices, getMemberServicesIcons } from '@/service/memberServices';
import iconsMap from '@/lib/iconsMap';
import { Service } from '@/model/Service';
import { getImagesByID } from '@/service/imagesServices';
import { ImageModel } from '@/model/ImageModel';
import { spinner } from '@heroui/theme';

interface SuggestionItemProps {
  image_url: string;
  title: string;
  slug: string;
  id: string;
  description?: string;
}

interface ServiceIcon {
  icon: string;
}



const SuggestionItem = ({ image_url, description, title, slug, id }: SuggestionItemProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cityName, setCityName] = useState<string>('Carregando...');
  const [serviceIcons, setServiceIcons] = useState<ServiceIcon[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [image, setImage] = useState<ImageModel>({ url: '/house.jpg', name: 'house' });

  useEffect(() => {
    (async () => {
      const city = await getCityByID(id);
      if (city) {
        setCityName(`${city.name} - ${abrevToName(city.state_id)}`);
      } else {
        setCityName('Localização não disponível');
      }
      const icons = await getMemberServicesIcons(id);
      const services = await getMemberServices(id);
      const images = await getImagesByID(id);
      if (images.length > 0) {
        setImage(images[Math.floor(Math.random() * images.length)]);
      }
      setServiceIcons(icons);
      setServices(services)
    })();
    setLoading(false);
  }, [id]);

  if(loading){
    return spinner({ size: 'md', className: 'm-auto' });
  }
  return (
    <a href={`/afiliados/${slug}`}>
      <div className="flex flex-col gap-4 w-[90vw]  sm:w-[20rem]">
        <div className="flex h-[18rem] w-[90vw] sm:h-[14rem] sm:w-[20rem] shadow-lg rounded-2xl overflow-clip hover:-translate-y-1 transition-all ease-in duration-300">
          <Image src={image.url} alt='house' height={600} width={700} className="grow object-cover" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{truncateString(title)}</p>
            <p className=''>{cityName}</p>
            <p className='hidden'>{description}</p>
          </div>

          <div className="flex  gap-2 text-[#535353]">
            <ul className='flex gap-2'>
              {serviceIcons.map((service, index) => {
                const Icon = iconsMap[service.icon as keyof typeof iconsMap];
                return Icon ? <li className="p-1 rounded-lg shadow-md" key={index}>
                  <Icon />
                </li> : null;
              })}
              {services.map((service, index) => {
                return <p key={index} className='hidden'>{service.name}</p>
              })}
            </ul>
          </div>
        </div>
      </div>
    </a>
  );
}

export default SuggestionItem;
