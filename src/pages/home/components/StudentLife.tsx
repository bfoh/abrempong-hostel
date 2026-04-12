import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface LifeCard {
  title: string;
  description: string;
  image: string;
}

const cards: LifeCard[] = [
  {
    title: "Astroturf Sports",
    description: "Stay active with our professional-grade sports pitch",
    image: "/astroturf2.jpeg",
  },
  {
    title: "Game Room",
    description: "Unwind with friends in our recreation space",
    image: "/game-space.jpeg",
  },
  {
    title: "Restaurant & Dining",
    description: "Enjoy delicious meals without leaving the compound",
    image: "/resto1.jpeg",
  },
  {
    title: "Fitness Center",
    description: "State-of-the-art gym equipment for your workout routine",
    image: "/gym2.jpeg",
  },
  {
    title: "Common Areas",
    description: "Spacious shared spaces for study and socializing",
    image: "/commonliningarea.jpeg",
  },
  {
    title: "Outdoor Recreation",
    description: "Beautiful outdoor spaces to relax and recharge",
    image: "/astroturf3.jpeg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
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

export default function StudentLife() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="student-life"
      className="w-full bg-dark-800 py-24 md:py-32 overflow-hidden"
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
            STUDENT LIFE
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold font-display tracking-tight">
            More Than Just A Room
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl mx-auto font-body">
            Experience a vibrant community with world-class facilities
          </p>
        </motion.div>
      </div>

      {/* Scroll area — full width */}
      <div className="relative">
        {/* Left arrow */}
        <motion.button
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-dark-700/80 border border-white/10 text-white backdrop-blur-sm cursor-pointer"
          whileHover={{
            scale: 1.1,
            borderColor: "rgba(200, 169, 106, 0.6)",
            color: "#C8A96A",
          }}
          transition={{ duration: 0.2 }}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <i className="ri-arrow-left-s-line text-xl" />
        </motion.button>

        {/* Right arrow */}
        <motion.button
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-gold text-black cursor-pointer"
          whileHover={{ scale: 1.1, backgroundColor: "#B8955A" }}
          transition={{ duration: 0.2 }}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <i className="ri-arrow-right-s-line text-xl" />
        </motion.button>

        {/* Cards container */}
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto px-12 md:px-14 pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Hide scrollbar for WebKit */}
          <style>{`
            #student-life [style*="scroll-snap-type"]::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] rounded-2xl overflow-hidden relative group cursor-pointer"
              style={{ scrollSnapAlign: "start" }}
              variants={cardVariants}
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                  <h3 className="text-white text-lg font-bold font-display mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm font-body leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
