'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react';
import SuggestionItem from '../SuggestionItem/page';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { CarouselProps } from '../../model/CarouselProps';

type Member = {
  id: string;
  name: string;
};



const Carousel = ({ title, members }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='embla flex flex-col gap-4 mb-4'>
      <div role="title-box" className="flex flex-row items-center justify-between text-xl font-bold">
        <div role="title">
          <p className='text-2xl'>{title}</p>
        </div>
        <div role="buttons" className="flex items-center flex-row gap-2">
          <button onClick={scrollPrev} className="embla__prev flex items-center justify-center gap-1 text-md text-[#cacaca] hover:text-[#b9b9b9] font-semibold transition-all ease-in-out duration-100 cursor-pointer">
            <FaCircleChevronLeft />
          </button>
          <button onClick={scrollNext} className="embla__next flex items-center justify-center gap-1 text-md text-[#cacaca] hover:text-[#b9b9b9] font-semibold transition-all ease-in-out duration-100 cursor-pointer">
            <FaCircleChevronRight />
          </button>
        </div>
      </div>

      <div className="embla__viewport overflow-hidden w-[90vw] sm:w-[90rem]" ref={emblaRef}>
        <div className='embla__container flex gap-10'>
          {members?.map((member) => (
            <div className='embla__slide flex-1 sm:flex-auto sm:flex' key={member.id}>
              <SuggestionItem title={member.name} id={member.id} image_url={member.image} slug={member.slug}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
