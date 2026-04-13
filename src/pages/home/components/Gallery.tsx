import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  span: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/exterior.jpeg", alt: "Hostel exterior view", span: "col-span-2 row-span-2" },
  { src: "/commonliningarea.jpeg", alt: "Common living area", span: "col-span-1" },
  { src: "/gym.jpeg", alt: "Fitness center", span: "col-span-1" },
  { src: "/astroturf1.jpeg", alt: "Astroturf sports area", span: "col-span-2" },
  { src: "/resto.jpeg", alt: "Restaurant and dining", span: "col-span-1" },
  { src: "/laundry.jpeg", alt: "Laundry facilities", span: "col-span-1" },
  { src: "/minimart.jpeg", alt: "On-site minimart", span: "col-span-1" },
  { src: "/game-space.jpeg", alt: "Game and recreation room", span: "col-span-1" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const lightboxImageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightbox(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null
    );
  }, []);

  useEffect(() => {
    if (lightbox === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, closeLightbox, goNext, goPrev]);

  return (
    <section
      id="gallery"
      className="w-full bg-dark-900 py-16 md:py-24 lg:py-32"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
            GALLERY
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold font-display tracking-tight">
            See For Yourself
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[220px] gap-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${img.span}`}
              variants={itemVariants}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/60 rounded-xl transition-all duration-300 pointer-events-none" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-white/80 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <i className="ri-zoom-in-line text-white text-lg" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <i className="ri-close-line text-xl" />
            </button>

            {/* Previous button */}
            <button
              className="absolute left-4 md:left-8 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-white/30 text-white hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
            >
              <i className="ri-arrow-left-s-line text-xl" />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-5xl max-h-[85vh] w-full object-contain rounded-xl select-none"
              variants={lightboxImageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Next button */}
            <button
              className="absolute right-4 md:right-8 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-gold text-black hover:bg-gold-dark transition-all duration-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
            >
              <i className="ri-arrow-right-s-line text-xl" />
            </button>

            {/* Image counter */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest font-body">
              {lightbox + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
