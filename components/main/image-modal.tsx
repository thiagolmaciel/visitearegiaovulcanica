'use client'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { FaCircleChevronLeft, FaCircleChevronRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { EmblaOptionsType } from 'embla-carousel'

interface ImageType {
    url: string
}

interface ImageModalProps {
    images: ImageType[]
    options?: EmblaOptionsType
    onClose?: () => void
    initialIndex?: number
}

const ImageModal = ({ images, options, onClose, initialIndex = 0 }: ImageModalProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        startIndex: initialIndex,
        ...options 
    })
    const [prevDisabled, setPrevDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(initialIndex)

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
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') scrollPrev()
            if (e.key === 'ArrowRight') scrollNext()
            if (e.key === 'Escape' && onClose) onClose()
        }
        
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [scrollPrev, scrollNext, onClose])

    return (
        <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white/20"
                    aria-label="Fechar modal"
                >
                    <FaTimes size={24} />
                </button>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedIndex + 1} / {images.length}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={scrollPrev}
                    disabled={prevDisabled}
                    className={`p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 ${
                        prevDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
                    }`}
                    aria-label="Imagem anterior"
                >
                    <FaChevronLeft size={24} />
                </button>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={scrollNext}
                    disabled={nextDisabled}
                    className={`p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 ${
                        nextDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
                    }`}
                    aria-label="Próxima imagem"
                >
                    <FaChevronRight size={24} />
                </button>
            </div>

            {/* Main Image Container */}
            <div 
                className="w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="embla__viewport overflow-hidden w-full h-full" ref={emblaRef}>
                    <div className="embla__container flex touch-pan-y h-full">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="embla__slide relative flex-[0_0_100%] h-full"
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src={img.url}
                                        alt={`Imagem ${idx + 1}`}
                                        width={1200}
                                        height={800}
                                        className="object-contain max-w-full max-h-full rounded-lg shadow-2xl"
                                        priority={idx === initialIndex}
                                        quality={95}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => emblaApi?.scrollTo(idx)}
                                className={`relative w-16 h-12 rounded overflow-hidden transition-all duration-200 ${
                                    idx === selectedIndex 
                                        ? 'ring-2 ring-white scale-110' 
                                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                                }`}
                            >
                                <Image
                                    src={img.url}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageModal
