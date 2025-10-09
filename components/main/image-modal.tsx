'use client'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { EmblaOptionsType } from 'embla-carousel'

interface ImageType {
    url: string
}

interface ImageModalProps {
    images: ImageType[]
    options?: EmblaOptionsType
}

const ImageModal = ({ images, options }: ImageModalProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [prevDisabled, setPrevDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(true)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setPrevDisabled(!emblaApi.canScrollPrev())
        setNextDisabled(!emblaApi.canScrollNext())
      }, [emblaApi])

      useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
      }, [emblaApi, onSelect])

    return (
        <div className="embla flex flex-row">
  <div className="embla__controls flex justify-between items-center px-4">
  <button onClick={scrollPrev} disabled={prevDisabled} className="h-max disabled:opacity-30">
      <FaCircleChevronLeft size={30} className='text-gray-300 hover:pointer hover:cursor-pointer hover:scale-105' />
    </button>
  </div>

  <div className="embla__viewport overflow-hidden h-[50rem] w-[90rem]" ref={emblaRef}>
    <div className="embla__container flex touch-pan-y">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="embla__slide relative flex-[0_0_100%] h-[50rem]"
        >
          <Image
            src={img.url}
            alt={`Imagem ${idx}`}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  </div>
  <div className="embla__controls flex justify-between items-center px-4">
    <button onClick={scrollNext} disabled={nextDisabled} className="h-max disabled:opacity-30 hover:cursor-pointer hover:scale-105">
      <FaCircleChevronRight size={30} className='text-gray-300 hover:pointer hover:cursor-pointer hover:scale-105' />
    </button>
  </div>

</div>

    )
}

export default ImageModal
