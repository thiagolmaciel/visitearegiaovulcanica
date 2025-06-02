'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect } from 'react';
import SuggestionItem from '../SuggestionItem/page';
const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel()

    const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi])
    const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi])

    return (
        <div className='embla'>
            <div className="embla__viewport overflow-hidden w-[90rem]" ref={emblaRef}>
                <div className='embla__container flex gap-10'>
                    <div className='embla__slide flex-1 '
                    >
                        <SuggestionItem  title="Fazenda" star="4.5"></SuggestionItem>
                    </div>
                    <div className='embla__slide flex-1 '
                    >
                        <SuggestionItem  title="Fazenda" star="4.5"></SuggestionItem>

                    </div>
                    <div className='embla__slide flex-1 '
                    >
                        <SuggestionItem  title="Fazenda" star="4.5"></SuggestionItem>

                    </div>
                    <div className='embla__slide flex-1 ' >
                        <SuggestionItem  title="Fazenda" star="4.5"></SuggestionItem>

                    </div>
                    <div className='embla__slide flex-1'
                    >
                        <SuggestionItem  title="Fazenda" star="4.5"></SuggestionItem>

                    </div>
                    <div className='embla__slide '
                    >
                        <SuggestionItem  title="Fazenda" star="4.5"></SuggestionItem>

                    </div>
                </div>

            </div>
            <button className="embla__prev" onClick={scrollPrev}>
                Prev
            </button>
            <button className="embla__next" onClick={scrollNext}>
                Next
            </button>
        </div>
    )
}

export default Carousel
