"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Hero = () => {
  // Data gambar bisa diambil dari props atau API di masa depan
  const heroImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    "/banner1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Logic Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Ganti gambar setiap 5 detik
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src={img}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto -mt-28 animate-fade-in-up">
        <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-2 drop-shadow-xl">
          Join Us
        </h2>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 pb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 drop-shadow-2xl">
            We are Hiring
          </span>
        </h1>

        <button className="bg-[#cba258] hover:bg-[#b8904e] text-white font-bold text-md px-10 py-4 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto ring-2 ring-[#cba258]/50 ring-offset-2 ring-offset-black">
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Layer 3: Carousel Indicators */}
      <div className="absolute bottom-10 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-400 w-8"
                : "bg-white/40 w-2 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
