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
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getImagesByID(member_id)
        setImages(images ?? null)
      } catch (error) {
        simpleToast('Erro ao carregar imagens', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
    setLoading(false)
  })

  if (loading || !images) {
    return <div className='loading'></div>
  }

    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : !images || images.length === 0 ? (
          <div>Nenhuma imagem disponível.</div>
        ) : (
          <>
            <div
              role="image_area"
              className="hidden sm:flex my-4 gap-1 sm:h-[40rem] w-full rounded-2xl overflow-clip"
            >
              <div
                role="image_box"
                className="relative overflow-clip flex-1 cursor-pointer"
                onClick={() => modalRef.current?.showModal()}
              >
                <Image
                  src={images[0].url}
                  alt=""
                  fill
                  className="object-cover scale-100 hover:scale-110 transition-all ease-in-out duration-250"
                />
              </div>
    
              <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    role="image_box"
                    className="relative overflow-clip cursor-pointer"
                  >
                    {images[idx]?.url ? (
                      <Image
                        src={images[idx].url}
                        alt=""
                        fill
                        className="object-cover scale-100 hover:scale-110 transition-all ease-in-out duration-250"
                        onClick={() => modalRef.current?.showModal()}
                      />
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
    
            <div role="mobile-images" className="block sm:hidden">
              <ImageCarousel images={images} />
              <div className="flex gap-2 w-full items-center justify-center text-[#b7b7b7]">
                <FaCircle size={7} />
                <FaCircle size={7} />
                <FaCircle size={7} />
              </div>
            </div>
          </>
        )}
      </div>
    )
    
}

export default DesktopMainImages
