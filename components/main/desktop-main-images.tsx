'use client'
import Image from 'next/image';
import React, { useRef } from 'react'
import ImageModal from './image-modal';
import ImageCarousel from './image-carousel';
import { FaCircle } from 'react-icons/fa';

interface Image {
    url: string;
}

interface ImageModalProps {
    images: Image[];
}

const DesktopMainImages = ({ images }: ImageModalProps) => {
    const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
       {images && images.length > 0 && (
          <>
            <div role="image_area" className='hidden sm:flex my-4 gap-1 sm:h-[40rem] w-full rounded-2xl overflow-clip'>
              {/* <div role='desktop-images' className='flex'> */}
              <div role="image_box" 
              className='relative overflow-clip flex-1 cursor-pointer'
              onClick={() => modalRef.current?.showModal()}>
                <Image
                  src={images[0].url}
                  alt=""
                  fill
                  className='object-cover scale-100 hover:scale-110 transition-all ease-in-out duration-250'
                />
              </div>
              <div className='flex-1 grid grid-cols-2 grid-rows-2 gap-1 '>
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} role="image_box" className='relative overflow-clip cursor-pointer'>
                    {images[idx]?.url ? (
                      <Image
                        src={images[idx].url}
                        alt=""
                        fill
                        className='object-cover scale-100 hover:scale-110 transition-all ease-in-out duration-250'
                        onClick={() => modalRef.current?.showModal()}
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full" />
                    )}
                  </div>
                ))}
              </div>
              <dialog ref={modalRef} id="image_desktop_modal" className="modal">
                <div className="modal-box max-w-none w-[100rem] my-10">
                  <form method="dialog" className='flex'>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                    <ImageModal images={images} />
                  </div>
              </dialog>
              {/* </div> */}
              {/* <div role='mobile-images' className='block sm:hidden'>
      <ImageCarousel images={images} />
      <div className='flex gap-2 w-full items-center justify-center text-[#b7b7b7]'><FaCircle size={7}/><FaCircle size={7}/><FaCircle size={7}/></div>
    </div> */}
            </div>
            <div role='mobile-images' className='block sm:hidden'>
              <ImageCarousel images={images} />
              <div className='flex gap-2 w-full items-center justify-center text-[#b7b7b7]'><FaCircle size={7} /><FaCircle size={7} /><FaCircle size={7} /></div>
            </div>
          </>
        )}
    </div>
  )
}

export default DesktopMainImages
