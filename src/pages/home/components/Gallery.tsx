import { useEffect, useRef, useState } from "react";

const galleryImages = [
  {
    id: 1,
    src: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/695fb9e1-2382-46a1-9ce2-999bc99888fc_frontview2.png?v=135fccb58174298258a7111ed0b173f4",
    alt: "Abrempong Hostel front view",
    span: "col-span-2",
  },
  {
    id: 2,
    src: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/25b64b94-c753-4680-b19f-d57f708c5c8f_room.png?v=f3d1147f0c4b02da587c3f1d37ea8c2a",
    alt: "Abrempong Hostel room interior",
    span: "col-span-1",
  },
  {
    id: 3,
    src: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/dda42490-6667-4036-ba75-2618930cb7c5_kitchen.png?v=64e31cda00b92afc7fa0674a84d7eb22",
    alt: "Abrempong Hostel kitchen",
    span: "col-span-1",
  },
  {
    id: 4,
    src: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/3bb46c26-5bf5-4381-a5d3-5a2852deeb9b_corridor.png?v=c4e54073835905b803650391d69f9ff6",
    alt: "Abrempong Hostel corridor",
    span: "col-span-1",
  },
  {
    id: 5,
    src: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/862f2ed8-0c3a-4461-917b-820d07d6855d_backview.png?v=159a55a86f85807171d272e2e3299512",
    alt: "Abrempong Hostel back view",
    span: "col-span-1",
  },
  {
    id: 6,
    src: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/85484acb-04fe-4ddf-aaa8-665ad4f1bd19_astroturf.jpg?v=ed0e69a426b8b59bb4c69b43db06da48",
    alt: "Abrempong Hostel astroturf outdoor area",
    span: "col-span-2",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null) {
        setLightbox((lightbox + 1) % galleryImages.length);
      }
      if (e.key === "ArrowLeft" && lightbox !== null) {
        setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="w-full bg-white py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[#C8A96A] text-xs uppercase tracking-[0.3em] mb-4">Explore</p>
          <div className="w-16 h-0.5 bg-[#C8A96A] mx-auto mb-6"></div>
          <h2
            className="text-[#0F0F0F] text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Spaces
          </h2>
          <p className="text-gray-500 text-base mt-4">A glimpse into life at Abrempong Hostel</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${img.span} ${
                visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              } transition-all duration-700`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 md:h-64 object-cover object-top grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <i className="ri-zoom-in-line text-white text-lg"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-[#C8A96A] text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => setLightbox(null)}
          >
            <i className="ri-close-line text-xl"></i>
          </button>
          <button
            className="absolute left-4 md:left-8 w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all duration-300 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); }}
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].alt}
            className="max-w-4xl max-h-[80vh] w-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 md:right-8 w-10 h-10 flex items-center justify-center rounded-full bg-[#C8A96A] text-black hover:bg-[#b8955a] transition-all duration-300 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }}
          >
            <i className="ri-arrow-right-line text-xl"></i>
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest">
            {lightbox + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}
