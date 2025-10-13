'use client'
import { IoShareSocial } from 'react-icons/io5';
import { useState } from 'react';

interface ShareButtonProps {
  title?: string;
  url?: string;
  className?: string;
}

const ShareButton = ({ 
  title = 'Compartilhar', 
  url = typeof window !== 'undefined' ? window.location.href : '',
  className = ''
}: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      // Check if native share API is available (mobile)
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: url
        });
      } else {
        // Fallback for desktop - copy to clipboard
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: try to copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 text-sm sm:text-base hover:opacity-80 transition-opacity ${className}`}
      aria-label={copied ? 'URL copiada!' : 'Compartilhar'}
    >
      <p className='hidden sm:block'>
        {copied ? 'Copiado!' : title}
      </p>
      <IoShareSocial className={`text-xl sm:text-2xl transition-colors ${
        copied ? 'text-green-500' : ''
      }`} />
    </button>
  );
};

export default ShareButton;
