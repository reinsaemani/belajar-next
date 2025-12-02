"use client";

import { paths } from "@/config/paths";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const menus = [
    { label: "Home", href: paths.app.client.home.getHref() },
    { label: "About Us", href: paths.app.client.about.getHref() },
    { label: "Testimonials", href: paths.app.client.testimonials.getHref() },
    { label: "Life at Waleta", href: paths.app.client.testimonials.getHref() },
    {
      label: "Vacancies",
      href: paths.app.client.vacancies.getHref(),
      isButton: true,
    },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-sidebar shadow-md py-2" : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {menus.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={
                  item.isButton
                    ? "bg-pink-600 text-white hover:bg-pink-700 px-5 py-2.5 rounded-full text-md font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    : "text-gray-200 hover:text-pink-600 underline-offset-3 hover:underline px-3 py-2 rounded-md text-md font-bold transition-colors duration-200"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden transition-colors duration-300 ${
          scrolled
            ? "bg-sidebar border-t border-gray-800"
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menus.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
