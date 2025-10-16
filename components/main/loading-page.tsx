'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingPage() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Show loading for 2 seconds while content loads in background
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 bg-[var(--main-color)] flex items-center justify-center z-[9999] transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <Image
            src="/logo.png"
            alt="VisiteRV Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Loading Animation */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
