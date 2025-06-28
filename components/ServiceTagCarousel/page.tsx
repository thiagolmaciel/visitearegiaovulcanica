'use client'
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';
import CategoryItem from '../CategoryItem/page';
import { Service } from '../../model/Service';
import iconsMap from '../../lib/iconsMap';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';

type Props = {
  services: Service[];
};

const ServiceTagCarousel = ({ services }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex items-center max-w-[100vw] sm:max-w-[90rem] w-full gap-4">
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
            return (
              <div className="embla__slide min-w-[200px]" key={service.id}>
                <a href={`/search?query=${service.name}`}>
                    <CategoryItem icon={Icon} name={service.name} />
                </a>
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
