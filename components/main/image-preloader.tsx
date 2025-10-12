'use client'
import { useEffect } from 'react'

interface ImagePreloaderProps {
  imageUrls: string[]
}

const ImagePreloader = ({ imageUrls }: ImagePreloaderProps) => {
  useEffect(() => {
    // Preload critical fallback images
    const fallbackImages = ['/house.jpg']
    
    // Combine fallback images with provided URLs
    const allImages = [...fallbackImages, ...imageUrls]
    
    // Create image preloaders for each URL
    allImages.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })

    // Cleanup function to remove preload links when component unmounts
    return () => {
      allImages.forEach((url) => {
        const existingLink = document.querySelector(`link[href="${url}"]`)
        if (existingLink) {
          document.head.removeChild(existingLink)
        }
      })
    }
  }, [imageUrls])

  return null // This component doesn't render anything
}

export default ImagePreloader
