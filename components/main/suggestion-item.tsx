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
  const [stateName, setStateName] = useState<string>('');
  const [cityNameOnly, setCityNameOnly] = useState<string>('');
  const [serviceIcons, setServiceIcons] = useState<ServiceIcon[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [image, setImage] = useState<ImageModel>({ url: '/house.jpg', name: 'house' });

  useEffect(() => {
    (async () => {
      const city = await getCityByID(id);
      if (city) {
        const state = abrevToName(city.state_id);
        setStateName(state);
        setCityNameOnly(city.name);
        setCityName(`${city.name} - ${state}`);
      } else {
        setCityName('Localização não disponível');
        setStateName('');
        setCityNameOnly('');
      }
      const icons = await getMemberServicesIcons(id);
      const services = await getMemberServices(id);
      const images = await getImagesByID(id);
      if (images.length > 0) {
        const selectedImage = images[Math.floor(Math.random() * images.length)];
        setImage(selectedImage);
        
        // Preload da imagem selecionada
        const img = new window.Image();
        img.onload = () => {
          setLoading(false);
        };
        img.onerror = () => {
          setLoading(false);
        };
        img.src = selectedImage.url;
      } else {
        // Preload da imagem padrão
        const img = new window.Image();
        img.onload = () => {
          setLoading(false);
        };
        img.onerror = () => {
          setLoading(false);
        };
        img.src = '/house.jpg';
      }
      setServiceIcons(icons);
      setServices(services)

    })();
  }, [id]);

  if(loading){
    return (
      <div className="flex flex-col gap-3 w-full h-full min-h-[22rem] bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex h-[14rem] w-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-500"></div>
        </div>
        <div className="p-4 flex flex-col gap-3 flex-1 min-h-0">
          <div className="flex flex-col gap-2">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="border-b border-gray-200 mt-2"></div>
          <div className="flex items-center justify-between mt-auto">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <a href={`/afiliados/${slug}`} className="block h-full w-full">
      <div className="flex flex-col gap-3 w-full h-full min-h-[22rem] bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all ease-in-out duration-300 cursor-pointer">
        <div className="relative h-[14rem] w-full overflow-hidden group flex-shrink-0">
          <Image 
            src={image.url} 
            alt={title} 
            height={600} 
            width={700} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          
          {/* Ícones de categoria no canto superior direito */}
          <div className="absolute top-2 right-2 flex gap-1">
            {serviceIcons.slice(0, 4).map((service, index) => {
              const Icon = iconsMap[service.icon as keyof typeof iconsMap];
              return Icon ? (
                <div key={index} className="bg-white rounded-lg p-1 shadow-sm">
                  <Icon className="w-3 h-3 text-[var(--main-color)]" />
                </div>
              ) : null;
            })}
            {serviceIcons.length > 4 && (
              <div className="bg-white rounded-lg p-1 shadow-sm">
                <span className="text-xs text-gray-500 font-medium">+{serviceIcons.length - 4}</span>
              </div>
            )}
          </div>
          
          {/* Sombra interna no hover */}
          <div className="absolute inset-0 shadow-inner opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4 flex flex-col gap-3 flex-1 min-h-0">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-800 text-lg leading-tight line-clamp-2">{truncateString(title)}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="truncate">{cityName}</span>
            </div>
            
            {/* Divisória sutil */}
            <div className="border-b border-gray-200 mt-2"></div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm text-gray-500 hover:text-[var(--main-color)] transition-colors">Ver detalhes</span>
            <svg className="w-3 h-3 text-gray-500 hover:text-[var(--main-color)] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* Hidden data attributes for filtering */}
          <div className='hidden' data-member-id={id} data-member-name={title.toLowerCase()}>
            <p data-filter-type="description">{description}</p>
            <p data-filter-type="state">{stateName}</p>
            <p data-filter-type="city">{cityNameOnly}</p>
            {services.map((service, index) => (
              <p key={index} data-filter-type="service">{service.name}</p>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default SuggestionItem;
