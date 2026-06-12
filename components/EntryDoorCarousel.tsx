"use client";

import { useEffect, useState } from "react";

export type EntryDoorCarouselImage = string | {
  desktop: string;
  mobile?: string;
};

type EntryDoorCarouselProps = {
  images: EntryDoorCarouselImage[];
  title: string;
};

function getImageSrc(image: EntryDoorCarouselImage) {
  return typeof image === "string" ? image : image.desktop;
}

function getMobileSrc(image: EntryDoorCarouselImage) {
  return typeof image === "string" ? undefined : image.mobile;
}

export default function EntryDoorCarousel({ images, title }: EntryDoorCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="entry-door-carousel" aria-label="Entry door image carousel">
      <div className="entry-door-carousel-stage">
        {images.map((image, index) => (
          <figure className={index === activeIndex ? "is-active" : ""} key={getImageSrc(image)}>
            <picture>
              {getMobileSrc(image) ? <source media="(max-width: 760px)" srcSet={getMobileSrc(image)} /> : null}
              <img src={getImageSrc(image)} alt={`${title} view ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
            </picture>
          </figure>
        ))}
      </div>

      <div className="entry-door-carousel-dots" aria-label="Choose slide">
        {images.map((image, index) => (
          <button
            aria-label={`Show slide ${index + 1}`}
            className={index === activeIndex ? "is-active" : ""}
            key={getImageSrc(image)}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
