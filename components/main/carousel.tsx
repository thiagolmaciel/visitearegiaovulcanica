'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useState, useEffect } from 'react';
import SuggestionItem from './suggestion-item';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { CarouselProps } from '@/model/CarouselProps';

type Member = {
  id: string;
  name: string;
};



const Carousel = ({ title, members }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 640px)': {
        slidesToScroll: 1
      }
    }
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      onSelect(emblaApi);
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);
    }
  }, [emblaApi, onSelect]);

  return (
    <div className='embla flex flex-col gap-4 mb-4 w-full'>
      <div role="title-box" className="flex flex-row items-center justify-between w-full">
        <div role="title">
          <p className='text-2xl font-bold'>{title}</p>
        </div>
        <div role="buttons" className="flex items-center justify-center flex-row gap-2">
          <button 
            onClick={scrollPrev} 
            disabled={!prevBtnEnabled}
            className={`embla__prev flex items-center justify-center gap-1 text-md font-semibold transition-all ease-in-out duration-100 ${
              prevBtnEnabled 
                ? 'text-[#cacaca] hover:text-[#b9b9b9] cursor-pointer' 
                : 'text-[#e5e5e5] cursor-not-allowed'
            }`}
          >
            <FaCircleChevronLeft />
          </button>
          <button 
            onClick={scrollNext} 
            disabled={!nextBtnEnabled}
            className={`embla__next flex items-center justify-center gap-1 text-md font-semibold transition-all ease-in-out duration-100 ${
              nextBtnEnabled 
                ? 'text-[#cacaca] hover:text-[#b9b9b9] cursor-pointer' 
                : 'text-[#e5e5e5] cursor-not-allowed'
            }`}
          >
            <FaCircleChevronRight />
          </button>
        </div>
      </div>

      <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
        <div className='embla__container py-2 flex'>
          {members?.map((member) => (
            <div className='embla__slide flex-[0_0_100%] sm:flex-[0_0_24%] sm:mr-4' key={member.id}>
              <SuggestionItem title={member.name} id={member.id} image_url={member.image} slug={member.slug}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
