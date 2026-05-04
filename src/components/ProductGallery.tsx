import React from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  imageBase?: string;
}

export default function ProductGallery({ images, productName, imageBase = '' }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const currentImage = images[currentIndex];
  const imageUrl = imageBase ? `${imageBase}${currentImage}` : `/${currentImage}`;

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image Display */}
      <div className="relative bg-surface-light rounded-lg overflow-hidden aspect-square flex items-center justify-center group">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              aria-label="Previous image"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              aria-label="Next image"
            >
              ❯
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === currentIndex
                  ? 'border-primary-dark ring-2 ring-primary-dark'
                  : 'border-border-light hover:border-border'
                }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={imageBase ? `${imageBase}${image}` : `/${image}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
