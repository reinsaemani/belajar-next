import Navbar from "@/components/navbar/Navbar";
import AboutUs from "@/components/about/AboutUs";
import { Hero } from "@/features/hero/component/hero";
import Testimonials from "@/components/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <AboutUs />
        <Testimonials />

        {/* Section Konten Lainnya */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Start Your Journey
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Kami membuka peluang untuk berbagai posisi. Temukan role yang
              sesuai dengan passion Anda di bawah ini.
            </p>
            {/* List lowongan bisa ditaruh disini */}
          </div>
        </section>
      </main>
    </>
  );
}
