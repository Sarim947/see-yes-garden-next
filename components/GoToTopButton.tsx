"use client";

import { useEffect, useState } from "react";

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsVisible(scrollableHeight > 0 && window.scrollY > scrollableHeight / 3);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <button
      className={`go-top-button${isVisible ? " is-visible" : ""}`}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Go to top"
    >
      Go to Top
    </button>
  );
}
