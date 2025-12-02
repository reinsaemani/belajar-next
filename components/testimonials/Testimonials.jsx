"use client";

import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Production Supervisor",
      department: "Production Dept",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
      quote:
        "Bekerja di Waleta memberikan saya kesempatan untuk berkembang dan belajar hal baru setiap hari.",
    },
    {
      id: 2,
      name: "Siti Aminah",
      role: "Quality Control",
      department: "QC Dept",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      quote:
        "Lingkungan kerja yang suportif dan kekeluargaan yang erat membuat saya betah berkarir di sini.",
    },
    {
      id: 3,
      name: "Rizky Pratama",
      role: "Marketing Specialist",
      department: "Marketing Dept",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
      quote:
        "Menjadi bagian dari tim yang inovatif adalah pengalaman yang luar biasa bagi karir saya.",
    },
    {
      id: 4,
      name: "Dewi Kartika",
      role: "HR Manager",
      department: "HR Dept",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
      quote:
        "Kami fokus pada pengembangan sumber daya manusia untuk mencapai visi misi perusahaan bersama.",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    // Background Gelap dengan Gradient Halus (Mirip Referensi)
    <section
      id="testimonials"
      className="py-24 bg-slate-900 relative overflow-hidden scroll-mt-24"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/20 blur-3xl rounded-full pointer-events-none translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* KOLOM KIRI: Teks & Navigasi */}
          {/* Perubahan Mobile: Order-2 (di bawah) dan Flex-center untuk tombol */}
          <div className="lg:col-span-4 text-white order-2 lg:order-1 flex flex-col items-center lg:block">
            {/* Teks Deskripsi (Disembunyikan di Mobile) */}
            <div className="hidden lg:block">
              <h3 className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">
                Testimonials
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                A Glimpse Inside <br />
                <span className="text-blue-500">Waleta</span>
              </h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                Bergabunglah bersama kami untuk mengenal calon rekan tim Anda
                dan pelajari bagaimana mereka berperan dalam memajukan misi
                perusahaan.
              </p>
            </div>

            {/* Tombol Navigasi (Tetap ada di mobile, diposisikan di bawah card) */}
            <div className="flex gap-4 mt-8 lg:mt-0">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-slate-600 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-slate-300 group-hover:text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-slate-600 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-white" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-8 bg-blue-500" : "w-2 bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* KOLOM KANAN: Carousel Card */}
          {/* Perubahan Mobile: Order-1 (di atas) */}
          <div className="lg:col-span-8 overflow-hidden relative min-h-[450px] flex items-center order-1 lg:order-2">
            <div
              className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" // Perhalus transisi
              style={{ transform: `translateX(-${activeIndex * 340}px)` }}
            >
              {testimonials.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 w-[320px] h-[420px] rounded-2xl relative overflow-hidden transition-all duration-700 group ${
                    index === activeIndex
                      ? "scale-100 opacity-100 shadow-2xl shadow-blue-900/50"
                      : "scale-90 opacity-60"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>

                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center z-10">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg relative z-10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center shadow-md z-20 font-serif text-xl font-bold">
                        "
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-1">
                      {item.name}
                    </h4>
                    <p className="text-blue-200 text-sm font-medium mb-4">
                      {item.role}
                    </p>
                    <div className="w-10 h-1 bg-blue-400/50 rounded-full mb-4"></div>
                    <p className="text-xs uppercase tracking-widest text-blue-300 mb-2 font-semibold">
                      {item.department}
                    </p>
                    <p className="text-white/90 text-sm italic leading-relaxed line-clamp-3">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
