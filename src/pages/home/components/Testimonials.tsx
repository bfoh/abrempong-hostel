import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kwame Asante",
    role: "University of Ghana Student",
    avatar:
      "https://readdy.ai/api/search-image?query=young%20Ghanaian%20male%20university%20student%20smiling%2C%20professional%20headshot%2C%20clean%20background%2C%20confident%20expression&width=100&height=100&seq=ava001&orientation=squarish",
    quote:
      "Living at Abrempong completely transformed how I study. The WiFi is fast, the environment is clean, and the security gives my parents peace of mind. Best decision I made.",
    rating: 5,
  },
  {
    id: 2,
    name: "Abena Mensah",
    role: "GIMPA Postgraduate Student",
    avatar:
      "https://readdy.ai/api/search-image?query=young%20Ghanaian%20female%20university%20student%20smiling%2C%20professional%20headshot%2C%20clean%20background%2C%20warm%20expression&width=100&height=100&seq=ava002&orientation=squarish",
    quote:
      "The rooms are spotless and the management is very responsive. I love how close it is to everything in Madina. The price is very fair for the quality you get.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emmanuel Boateng",
    role: "Young Professional, Accra",
    avatar:
      "https://readdy.ai/api/search-image?query=young%20Ghanaian%20male%20professional%20smiling%2C%20headshot%20portrait%2C%20clean%20background%2C%20smart%20casual%20attire&width=100&height=100&seq=ava003&orientation=squarish",
    quote:
      "I stayed here for 3 months while on a work assignment in Accra. The comfort level is way above what I expected for the price. Felt like home. Will definitely be back.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ama Owusu",
    role: "Accra Technical University",
    avatar:
      "https://readdy.ai/api/search-image?query=young%20Ghanaian%20female%20student%20smiling%2C%20casual%20portrait%2C%20clean%20background%2C%20friendly%20expression&width=100&height=100&seq=ava004&orientation=squarish",
    quote:
      "The location is perfect — I can get to campus in 15 minutes. The rooms are always clean and the water supply is consistent. I've recommended Abrempong to all my friends.",
    rating: 5,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoRotate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoRotate]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startAutoRotate();
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoRotate();
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    startAutoRotate();
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full bg-dark-750 py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
            Testimonials
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold font-display tracking-tight">
            What Residents Say
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="rounded-xl sm:rounded-[2rem] bg-white/[0.03] p-1 sm:p-1.5 ring-1 ring-white/[0.06]"><div className="relative overflow-hidden rounded-[calc(0.75rem-0.25rem)] sm:rounded-[calc(2rem-0.375rem)] bg-dark-700 p-5 sm:p-8 md:p-12 min-h-[280px] sm:min-h-[340px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            {/* Decorative gold quote mark */}
            <span className="absolute top-4 left-8 text-gold/15 text-[120px] leading-none select-none pointer-events-none font-display">
              &ldquo;
            </span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <i
                      key={i}
                      className="ri-star-fill text-gold text-sm"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed mb-8 italic font-display">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover object-top ring-2 ring-gold/30"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm font-body">
                      {t.name}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5 font-body">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrow Navigation */}
            <div className="flex items-center gap-3 mt-8 justify-end relative z-10">
              <button
                onClick={goPrev}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/15 hover:border-gold text-white/60 hover:text-gold transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <i className="ri-arrow-left-line" />
              </button>
              <button
                onClick={goNext}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gold text-black hover:bg-gold-dark transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div></div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 h-2 bg-gold"
                    : "w-2 h-2 bg-gold/30 hover:bg-gold/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
