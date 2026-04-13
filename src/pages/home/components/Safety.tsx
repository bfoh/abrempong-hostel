import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: "ri-door-lock-line",
    title: "Smart Door Access",
    description:
      "Advanced keycard entry system for controlled building access",
  },
  {
    icon: "ri-camera-line",
    title: "CCTV Coverage",
    description:
      "24/7 surveillance monitoring across all common areas",
  },
  {
    icon: "ri-shield-user-line",
    title: "Security Personnel",
    description:
      "Professional on-site security guards around the clock",
  },
  {
    icon: "ri-lock-line",
    title: "Gated Compound",
    description:
      "Fully fenced perimeter with controlled entry points",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  }),
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12 + 0.2,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  }),
};

export default function Safety() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="safety"
      className="w-full bg-dark-800 py-16 md:py-24 lg:py-32 overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
            Your Safety Matters
          </span>
          <motion.div
            className="h-0.5 bg-gold mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
          <h2 className="text-white text-3xl md:text-5xl font-bold font-display tracking-tight">
            Secured Living, Peace of Mind
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-2xl mx-auto font-body">
            Your security is our top priority. We&apos;ve invested in
            comprehensive security measures to give you and your family complete
            peace of mind.
          </p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-14 border border-gold/10"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.98 }
          }
          transition={{ duration: 0.9, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
        >
          <motion.img
            src="/door-security-system.jpeg"
            alt="Smart door security access system at Abrempong Hostel"
            className="w-full h-[220px] sm:h-[280px] md:h-[400px] object-cover object-center"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-800/40 via-transparent to-dark-800/40 pointer-events-none" />

          {/* Overlay text badge */}
          <motion.div
            className="absolute bottom-4 left-4 md:bottom-8 md:left-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <i className="ri-shield-check-line text-gold text-lg" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold font-display">
                  Multi-Layer Security
                </p>
                <p className="text-white/50 text-xs font-body">
                  Protecting you around the clock
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="rounded-[1.5rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.06] group"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="bg-dark-700 rounded-[calc(1.5rem-0.375rem)] p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] hover:ring-1 hover:ring-gold/20 transition-all duration-500">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300"
                    custom={i}
                    variants={iconVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <i
                      className={`${feature.icon} text-gold text-2xl`}
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-semibold mb-2 font-display group-hover:text-gold transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed font-body">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="mt-6 h-px bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.12 + 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <p className="text-white/40 text-sm font-body mb-6">
            Feel safe. Focus on what matters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://app.abremponghostel.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-gold text-black text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-gold-dark active:scale-[0.97] transition-all duration-300 font-body text-center"
            >
              Book a Secure Room
            </a>
            <a
              href="https://wa.me/233256112666"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/20 text-white/70 text-xs uppercase tracking-widest rounded-full hover:border-gold hover:text-gold active:scale-[0.97] transition-all duration-300 font-body text-center"
            >
              Ask About Security
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
