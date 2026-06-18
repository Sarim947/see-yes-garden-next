"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProductGalleryCarouselProps = {
  images: string[];
  title: string;
};

export default function ProductGalleryCarousel({ images, title }: ProductGalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (!hasMultipleImages) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, images.length]);

  return (
    <div className="product-gallery" aria-label={`${title} image carousel`}>
      <div className="product-main-image">
        {images.map((image, index) => (
          <figure className={index === activeIndex ? "is-active" : ""} key={image}>
            <Image
              src={image}
              alt={`${title} view ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </figure>
        ))}
      </div>

      {hasMultipleImages && (
        <div className="product-thumbs" aria-label="Choose product image">
          {images.map((image, index) => (
            <button
              aria-label={`Show ${title} image ${index + 1}`}
              className={index === activeIndex ? "is-active" : ""}
              key={image}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image src={image} alt="" fill sizes="140px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
