'use client'
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react'

interface Image {
    url: string;
}

interface Props {
    images: Image[];
}

const ImageCarousel = ({ images }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => new Set(prev).add(index));
    };

    return (
        <div className='embla flex flex-col gap-4 mb-4'>
            <div className="embla__viewport overflow-hidden w-[90vw] sm:w-[90rem]" ref={emblaRef}>
                <div className='embla__container flex gap-2'>
                    {images?.map((image, index) => (
                        <div className='embla__slide flex-1' key={index}>
                            <div className='relative overflow-clip h-[25rem] w-[90vw] rounded-2xl bg-gray-200'>
                                {!loadedImages.has(index) && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse z-10" />
                                )}
                                <Image
                                    src={image.url}
                                    alt=''
                                    fill
                                    className={`object-cover transition-opacity duration-300 ${
                                        loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onLoad={() => handleImageLoad(index)}
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
