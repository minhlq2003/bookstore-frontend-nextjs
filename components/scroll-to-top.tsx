"use client";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 right-2 md:right-5 w-10 h-10 border border-white bg-[#0b3d91] rounded-full shadow-2xl flex items-center justify-center
  transition-all duration-300 ease-in-out z-50 hover:scale-110 hover:shadow-none ${
    isVisible
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none"
  }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="white"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 15l-7-7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTop;
