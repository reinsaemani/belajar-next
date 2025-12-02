import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    // Menggunakan background slate-50 dengan pattern grid halus agar tidak polos
    <section
      id="about-us"
      className="relative py-24 bg-slate-50 overflow-hidden scroll-mt-24"
    >
      {/* Background Decoration (Lingkaran Gradasi Halus) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Container (Putih Shadow) - Mengapit konten agar fokus */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="lg:grid lg:grid-cols-2">
            {/* Kolom Kiri: Ilustrasi Walet (Logo Besar) */}
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-10 flex items-center justify-center border-r border-slate-100">
              {/* Pattern Dot Halus di background gambar */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "radial-gradient(#444 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>

              {/* Gambar Ilustrasi Walet (Placeholder) */}
              {/* Ganti src dengan gambar logo waleta yang sebenarnya */}
              <div className="relative z-10 transform transition-transform duration-500 hover:scale-105">
                {/* Menggunakan image placeholder burung walet yang elegan */}
                <img
                  src="/logo_waleta.svg" // Placeholder style vintage
                  alt="Waleta Illustration"
                  className="w-full max-w-sm rounded-lg mix-blend-multiply"
                  // mix-blend-multiply membuat background putih gambar menyatu dengan bg container
                />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="inline-block bg-[#8B0000] text-white px-6 py-1 rounded-full text-lg font-serif tracking-widest font-bold shadow-md transform -rotate-1">
                    WALETA
                  </span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Konten Teks */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-2 block">
                  PT. Waleta Asia Jaya
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  Bird’s Nest{" "}
                  <span className="text-blue-600">Processing Factory</span>
                </h2>
              </div>

              <div className="prose prose-slate text-slate-600 leading-relaxed mb-8 text-base">
                <p>
                  <strong>PT. WALETA ASIA JAYA</strong> adalah pabrik pemrosesan
                  sarang burung walet yang berlokasi di Indonesia, tepatnya di
                  Provinsi Jawa Tengah, Kota Salatiga.
                </p>
                <p className="mt-4">
                  Rumah burung walet kami berlokasi di jantung Pulau Kalimantan.
                  Dikelilingi oleh hutan hujan dan sungai, area terpencil ini
                  menyediakan habitat ideal bagi burung{" "}
                  <em>Collocalia fuchipaga</em> dan{" "}
                  <em>Aerodramus fuciphagus</em>.
                </p>
              </div>

              <div>
                <button className="group inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors border-b-2 border-transparent hover:border-blue-600 pb-1">
                  <Link href="https://waleta019.com/">Learn more</Link>
                  <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
