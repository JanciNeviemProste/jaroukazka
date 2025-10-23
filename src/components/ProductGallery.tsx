import React, { useState } from 'react';
import { cn } from '../utils/cn';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    } else if (e.key === 'ArrowRight' && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <div className={cn('space-y-4', className)} onKeyDown={handleKeyDown}>
      {/* Main Image */}
      <div
        className={cn(
          'relative aspect-square overflow-hidden rounded-xl bg-gray-100',
          'cursor-zoom-in'
        )}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={images[selectedImage]}
          alt={`${productName} - obrázok ${selectedImage + 1}`}
          className={cn(
            'w-full h-full object-cover transition-transform duration-300',
            isZoomed && 'scale-150 cursor-zoom-out'
          )}
        />

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
          {selectedImage + 1} / {images.length}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(Math.max(0, selectedImage - 1));
              }}
              disabled={selectedImage === 0}
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10',
                'bg-white/90 rounded-full shadow-lg',
                'flex items-center justify-center',
                'transition-opacity',
                selectedImage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
              )}
              aria-label="Predchádzajúci obrázok"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(Math.min(images.length - 1, selectedImage + 1));
              }}
              disabled={selectedImage === images.length - 1}
              className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10',
                'bg-white/90 rounded-full shadow-lg',
                'flex items-center justify-center',
                'transition-opacity',
                selectedImage === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
              )}
              aria-label="Nasledujúci obrázok"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden',
                'border-2 transition-all',
                selectedImage === index
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-primary-300'
              )}
              aria-label={`Zobraziť obrázok ${index + 1}`}
            >
              <img
                src={image}
                alt={`${productName} náhľad ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;