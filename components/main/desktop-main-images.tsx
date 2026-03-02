'use client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import ImageModal from './image-modal';
import ImageCarousel from './image-carousel';
import { FaCircle } from 'react-icons/fa';
import { getImagesByID } from '@/service/imagesServices';
import { simpleToast } from '@/utils/simple-toast';

interface Image {
    url: string;
}
interface DesktopMainImagesProps {
  member_id: string;
}


const DesktopMainImages: React.FC<DesktopMainImagesProps> = ({ member_id }) => {  
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<Image[]>([])
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImagesByID(member_id)
        setImages(fetchedImages ?? [])
      } catch (error) {
        simpleToast('Erro ao carregar imagens', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [member_id])

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }

  // Skeleton component for desktop
  const DesktopSkeleton = () => (
    <div
      role="image_area"
      className="hidden sm:flex my-4 gap-1 sm:h-[40rem] w-full rounded-2xl overflow-clip"
    >
      <div className="relative overflow-clip flex-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="relative overflow-clip bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div>
        <DesktopSkeleton />
        <div role="mobile-images" className="block sm:hidden">
          <div className='embla flex flex-col gap-4 mb-4'>
            <div className="embla__viewport overflow-hidden w-[90vw] sm:w-[90rem]">
              <div className='embla__container flex gap-2'>
                {[1, 2, 3].map((idx) => (
                  <div className='embla__slide flex-1' key={idx}>
                    <div className='relative overflow-clip h-[25rem] w-[90vw] rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!images || images.length === 0) {
    return <div>Nenhuma imagem disponível.</div>
  }

  return (
    <div>
      {/* Desktop Layout */}
      <div
        role="image_area"
        className="hidden sm:flex my-4 gap-1 sm:h-[40rem] w-full rounded-2xl overflow-clip"
      >
        <div
          role="image_box"
          className="relative overflow-clip flex-1 cursor-pointer bg-gray-200"
          onClick={() => modalRef.current?.showModal()}
        >
          {!loadedImages.has(0) && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse z-10" />
          )}
          <Image
            src={images[0].url}
            alt=""
            fill
            className={`object-cover scale-100 hover:scale-110 transition-all ease-in-out duration-250 ${
              loadedImages.has(0) ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(0)}
          />
        </div>

        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              role="image_box"
              className="relative overflow-clip cursor-pointer bg-gray-200"
              onClick={() => modalRef.current?.showModal()}
            >
              {images[idx]?.url ? (
                <>
                  {!loadedImages.has(idx) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse z-10" />
                  )}
                  <Image
                    src={images[idx].url}
                    alt=""
                    fill
                    className={`object-cover scale-100 hover:scale-110 transition-all ease-in-out duration-250 ${
                      loadedImages.has(idx) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(idx)}
                  />
                </>
              ) : (
                <div className="bg-gray-200 w-full h-full" />
              )}
            </div>
          ))}
        </div>

        <dialog ref={modalRef} id="image_desktop_modal" className="modal rounded-lg">
          <div className="modal-box max-w-7xl w-full py-10 relative">
            <form method="dialog" className="flex">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0 m-4">
                ✕
              </button>
            </form>
            <ImageModal images={images} />
          </div>
        </dialog>
      </div>

      {/* Mobile Layout */}
      <div role="mobile-images" className="block sm:hidden">
        <ImageCarousel images={images} />
        <div className="flex gap-2 w-full items-center justify-center text-[#b7b7b7]">
          <FaCircle size={7} />
          <FaCircle size={7} />
          <FaCircle size={7} />
        </div>
      </div>
    </div>
  )
    
}

export default DesktopMainImages
