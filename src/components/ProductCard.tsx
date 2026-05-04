import React from 'react';
import type { Product } from '../lib/products';

interface ProductCardProps {
  product: Product;
  imageBase?: string;
}

export default function ProductCard({ product, imageBase = '' }: ProductCardProps) {
  const whatsappMessage = `Hi, I'm interested in the ${product.name} (₹${product.price}). Could you provide more details?`;
  const whatsappLink = `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="card overflow-hidden">
      {/* Image Slider */}
      <ImageSlider images={product.images} name={product.name} imageBase={imageBase} />

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="inline-block text-xs font-semibold text-primary-dark mb-2 opacity-75 uppercase tracking-wide">
          {product.category}
        </span>

        <h3 className="text-base font-bold text-text-primary mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <p className="text-accent font-bold text-lg mb-3">₹{product.price}</p>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}

interface ImageSliderProps {
  images: string[];
  name: string;
  imageBase?: string;
}

function ImageSlider({ images, name, imageBase = '' }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const currentImage = images[currentIndex];
  const imageUrl = imageBase ? `${imageBase}${currentImage}` : `/${currentImage}`;

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex(index);
  };

  return (
    <div className="relative bg-surface-light aspect-video flex items-center justify-center overflow-hidden group">
      {/* Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Previous image"
        >
          ❮
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Next image"
        >
          ❯
        </button>
      )}

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 px-2.5 py-2 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(index, e)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-white w-2.5' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
