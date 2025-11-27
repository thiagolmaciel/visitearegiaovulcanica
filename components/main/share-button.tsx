'use client'
import { IoShareSocial } from 'react-icons/io5';
import { useState } from 'react';

interface ShareButtonProps {
  title?: string; // Share title/content
  description?: string;
  image?: string;
  url?: string;
  className?: string;
  buttonLabel?: string; // Button display text
}

const ShareButton = ({ 
  title: shareTitle,
  description,
  image,
  url = typeof window !== 'undefined' ? window.location.href : '',
  className = '',
  buttonLabel = 'Compartilhar'
}: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareText = shareTitle 
      ? `${shareTitle}${description ? `\n\n${description}` : ''}\n\n${shareUrl}`
      : shareUrl;

    try {
      // Check if native share API is available (mobile)
      if (navigator.share) {
        const shareData: ShareData = {
          title: shareTitle || document.title,
          text: description || '',
          url: shareUrl,
        };
        
        // Add image if available (some browsers support files)
        if (image && navigator.canShare && navigator.canShare({ files: [] })) {
          try {
            // Try to fetch and share image as file (limited browser support)
            const response = await fetch(image);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: blob.type });
            
            if (navigator.canShare({ files: [file] })) {
              shareData.files = [file];
            }
          } catch (e) {
            // If image sharing fails, continue without it
            console.log('Image sharing not supported, continuing without image');
          }
        }
        
        await navigator.share(shareData);
      } else {
        // Fallback for desktop - copy to clipboard with context
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
        // Fallback: try to copy to clipboard
        try {
          await navigator.clipboard.writeText(shareText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (clipboardError) {
          console.error('Error copying to clipboard:', clipboardError);
        }
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
        {copied ? 'Copiado!' : buttonLabel}
      </p>
      <IoShareSocial className={`text-xl sm:text-2xl transition-colors ${
        copied ? 'text-green-500' : ''
      }`} />
    </button>
  );
};

export default ShareButton;
