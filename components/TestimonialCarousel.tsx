"use client";

import { useRef } from "react";
import Image from "next/image";

type Testimonial = {
  title: string;
  quote: string;
  customer: string;
  badge: string;
  image: string;
  initial: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: number) {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".testimonial-card");
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: "smooth" });
  }

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-controls" aria-label="Customer testimonial controls">
        <button type="button" onClick={() => scrollByCard(-1)} aria-label="Previous testimonial">
          ←
        </button>
        <button type="button" onClick={() => scrollByCard(1)} aria-label="Next testimonial">
          →
        </button>
      </div>
      <div className="testimonial-track" ref={trackRef}>
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.title}>
            <div className="testimonial-photo">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 760px) 82vw, (max-width: 1080px) 42vw, 340px"
              />
              <span>{item.badge}</span>
            </div>
            <div className="testimonial-copy">
              <div className="quote-mark">“</div>
              <p>{item.quote}</p>
              <div className="testimonial-author">
                <span>{item.initial}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.customer}</small>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
