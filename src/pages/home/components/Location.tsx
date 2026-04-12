import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  { icon: "ri-building-2-line", text: "5 min from University of Ghana, Legon" },
  { icon: "ri-bus-line", text: "Walking distance to Madina Market & transport" },
  { icon: "ri-hospital-line", text: "Close to hospitals & health facilities" },
  {
    icon: "ri-shopping-bag-line",
    text: "Near shopping malls & restaurants",
  },
];

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="location"
      ref={sectionRef}
      className="w-full bg-dark-900 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
              Find Us
            </span>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 font-display tracking-tight">
              Perfectly Located
              <br />
              in Madina
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8 font-body">
              Strategically situated in the heart of Madina, Accra — one of the
              most vibrant and accessible neighborhoods in Greater Accra.
              Everything you need is within reach.
            </p>

            {/* Highlights */}
            <ul className="space-y-4 mb-8">
              {highlights.map((h, i) => (
                <motion.li
                  key={h.text}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 flex-shrink-0 mt-0.5">
                    <i className={`${h.icon} text-gold text-sm`} />
                  </div>
                  <span className="text-white/60 text-sm leading-relaxed font-body">
                    {h.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Address Box */}
            <motion.div
              className="flex items-start gap-3 p-4 bg-dark-700 rounded-xl mb-6 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-2-fill text-gold text-xl" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm font-body">
                  Abrempong Hostel
                </p>
                <p className="text-white/40 text-sm mt-0.5 font-body">
                  Madina, Greater Accra Region, Ghana
                </p>
              </div>
            </motion.div>

            {/* Get Directions Button */}
            <motion.a
              href="https://maps.google.com/?q=Madina,+Accra,+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer whitespace-nowrap font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="ri-navigation-line" />
              Get Directions
            </motion.a>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="rounded-2xl overflow-hidden border border-gold/15 h-[300px] sm:h-[400px] md:h-[500px] shadow-2xl shadow-black/40">
              <iframe
                title="Abrempong Hostel Location - Madina Accra"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15882.123456789!2d-0.1634!3d5.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b3b3b3b3b3b%3A0x0!2sMadina%2C+Accra%2C+Ghana!5e0!3m2!1sen!2sgh!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
