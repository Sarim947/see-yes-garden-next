"use client";

import { useEffect, useState } from "react";

type EntryDoorCarouselProps = {
  images: string[];
  title: string;
};

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
          <figure className={index === activeIndex ? "is-active" : ""} key={image}>
            <img src={image} alt={`${title} view ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
          </figure>
        ))}
      </div>

      <div className="entry-door-carousel-dots" aria-label="Choose slide">
        {images.map((image, index) => (
          <button
            aria-label={`Show slide ${index + 1}`}
            className={index === activeIndex ? "is-active" : ""}
            key={image}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
