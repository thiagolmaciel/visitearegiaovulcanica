import Image from 'next/image';
import React from 'react'

interface Image {
    url: string;
}

interface ImageModalProps {
    images: Image[];
}

const ImageModal = ({ images }: ImageModalProps) => {
    return (
        <div>
            <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 w-screen h-[90vh]">
                {images.map((img, idx) => (
                    <div key={idx} className="carousel-item h-max w-max relative">
                    <Image src={img.url} alt={`Imagem ${idx}`} fill className='object-cover'></Image>
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default ImageModal
