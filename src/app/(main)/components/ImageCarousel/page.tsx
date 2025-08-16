'use client'
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback } from 'react'

interface Image {
    url: string;
}

interface Props {
    images: Image[];
}

const ImageCarousel = ({ images }: Props) => {

    const [emblaRef, emblaApi] = useEmblaCarousel();

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className='embla flex flex-col gap-4 mb-4'>

            <div className="embla__viewport overflow-hidden w-[90vw] sm:w-[90rem]" ref={emblaRef}>
                <div className='embla__container flex gap-2'>
                    {images?.map((image, index) => (
                        <div className='embla__slide flex-1' key={index}>
                            <div className='relative overflow-clip h-[25rem] w-[90vw] rounded-2xl'>
                            <Image
                            src={image.url}
                            alt=''
                            fill
                            className='object-cover'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageCarousel
