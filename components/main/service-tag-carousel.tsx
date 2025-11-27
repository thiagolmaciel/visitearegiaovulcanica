'use client'
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';
import { Service } from '@/model/Service';
import iconsMap from '@/lib/iconsMap';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import CategoryItem from './category-item';
import { useRouter } from 'next/navigation';

type Props = {
  services: Service[];
  onServiceSelect?: (serviceId: string | null) => void;
  selectedServiceId?: string | null;
  navigateToSearch?: boolean; // New prop to control navigation behavior
};

const ServiceTagCarousel = ({ services, onServiceSelect, selectedServiceId, navigateToSearch = false }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const router = useRouter();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleServiceClick = (service: Service, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (navigateToSearch) {
      // Navigate to search page with service filter
      const serviceName = encodeURIComponent(service.name);
      router.push(`/search?service=${serviceName}`);
    } else if (onServiceSelect) {
      // Toggle: if same service is clicked, deselect it
      if (selectedServiceId === service.id) {
        onServiceSelect(null);
      } else {
        onServiceSelect(service.id);
      }
    }
  };

  return (
    <div className="flex items-center w-full gap-4">
      <button
        onClick={scrollPrev}
        className="text-[#cacaca] bg-[#eeeeee] p-2 rounded-full shadow-md hover:-translate-y-0.5 transition active:bg-[#f7f7f7]"
      >
        <FaCircleChevronLeft />
      </button>

      <div className="flex-1 overflow-hidden h-13" ref={emblaRef}>
        <div className="embla__container flex items-center h-full gap-2">
          {services.map((service) => {
            const Icon = iconsMap[service.icon as keyof typeof iconsMap];
            const isSelected = selectedServiceId === service.id;
            return (
              <div className="embla__slide min-w-[200px]" key={service.id}>
                <div 
                  onClick={(e) => handleServiceClick(service, e)}
                >
                  <CategoryItem icon={Icon} name={service.name} isSelected={isSelected} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={scrollNext}
        className="text-[#cacaca] bg-[#eeeeee] p-2 rounded-full shadow-md hover:-translate-y-0.5 transition active:bg-[#f7f7f7]"
      >
        <FaCircleChevronRight />
      </button>
    </div>
  );
};

export default ServiceTagCarousel;
