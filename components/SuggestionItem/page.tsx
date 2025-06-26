'use client'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { abrevToName, truncateString } from "../../lib/textFunctions";
import { getCityByID } from "../../service/locationServices";
import { getMemberServicesIcons } from '../../service/memberServices';
import iconsMap from '../../lib/iconsMap';

interface SuggestionItemProps {
  image_url: string;
  title: string;
  slug: string;
  id: number;
}

interface Service {
  icon: string;
}

const SuggestionItem = ({ image_url, title, slug, id }: SuggestionItemProps) => {
  const [cityName, setCityName] = useState<string>('Carregando...');
  const [serviceIcons, setServiceIcons] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      const city = await getCityByID(id);
      if (city) {
        setCityName(`${city.name} - ${abrevToName(city.state_id)}`);
      } else {
        setCityName('Localização não disponível');
      }

      const icons = await getMemberServicesIcons(id);
      setServiceIcons(icons);
    })();
  }, [id]);

  return (
    <a href={`afiliados/${slug}`}>
      <div className="flex flex-col gap-4 w-[20rem]">
        <div className="flex h-30 w-90 sm:h-[14rem] sm:w-[20rem] shadow-lg rounded-2xl overflow-clip hover:-translate-y-1 transition-all ease-in duration-300">
          <Image src={image_url} alt='house' height={300} width={350} className="sm:object-cover" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{truncateString(title)}</p>
            <p className=''>{cityName}</p>
          </div>

          <div className="flex  gap-2 text-[#535353]">
            <ul className='flex gap-2'>
              {serviceIcons.map((service, index) => {
                const Icon = iconsMap[service.icon as keyof typeof iconsMap];
                return Icon ? <li className="p-1 rounded-lg shadow-md" key={index}>
                  <Icon  />
                </li> : null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </a>
  );
}

export default SuggestionItem;
