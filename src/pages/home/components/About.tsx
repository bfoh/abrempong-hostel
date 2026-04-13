import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "200+", label: "Happy Residents" },
  { value: "5+", label: "Years of Excellence" },
  { value: "24/7", label: "Security & Support" },
  { value: "4.9★", label: "Average Rating" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
    },
  };

  return (
    <section
      id="about"
      className="w-full bg-dark-750 py-16 md:py-24 lg:py-32 overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -80, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -80, filter: "blur(6px)" }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/* Decorative gold border frame */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl border border-gold/20 z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
              />
              <motion.img
                src="/exterior.jpeg"
                alt="Abrempong Hostel modern building exterior in Madina, Accra"
                className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover object-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 right-2 md:right-6 bg-dark-950 border border-gold/20 px-6 py-4 rounded-xl shadow-2xl shadow-black/50 z-20"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.8, y: 20 }
              }
              transition={{ duration: 0.8, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              <p className="text-gold text-2xl font-bold font-display">
                Est. 2019
              </p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-1 font-body">
                Madina, Accra
              </p>
            </motion.div>

            {/* Decorative gold corner accent */}
            <motion.div
              className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 80, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 80, filter: "blur(6px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
              Who We Are
            </span>

            <motion.div
              className="w-16 h-0.5 bg-gold mb-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
            />

            <motion.h2
              className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 font-display tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A Refined Living
              <br />
              <span className="text-gold-gradient">Experience</span>
            </motion.h2>

            <motion.p
              className="text-white/70 text-base leading-relaxed mb-5 font-body"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Abrempong Hostel is more than just a place to sleep — it&apos;s a
              thoughtfully curated living environment designed for students, young
              professionals, and travelers who value comfort, security, and
              community.
            </motion.p>

            <motion.p
              className="text-white/70 text-base leading-relaxed mb-5 font-body"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Strategically located in Madina, Accra, we offer unmatched
              accessibility to major universities, transport hubs, markets, and the
              city center.
            </motion.p>

            <motion.p
              className="text-white/70 text-base leading-relaxed mb-10 font-body"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              Our rooms are clean, secure, and designed with your wellbeing in mind.
              From reliable electricity and water supply to high-speed WiFi and 24/7
              security, every detail is handled so you can focus on what matters
              most.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="border-l-2 border-gold pl-4 group"
                  variants={statVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-2xl font-bold font-display group-hover:text-gold transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs uppercase tracking-wider mt-1 font-body">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
