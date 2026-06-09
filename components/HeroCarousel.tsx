"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlide = {
  title: string;
  image: string;
};

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goTo = (index: number) => setCurrent((index + slides.length) % slides.length);

  return (
    <section className="hero-carousel" aria-label="Featured product banners">
      <div
        className="hero-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="hero-slide" key={slide.image}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-arrow carousel-prev"
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(current - 1)}
      >
        ‹
      </button>
      <button
        className="carousel-arrow carousel-next"
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(current + 1)}
      >
        ›
      </button>

      <div className="carousel-dots" aria-label="Choose slide">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            className={index === current ? "active" : ""}
            type="button"
            aria-label={`Show ${slide.title}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
