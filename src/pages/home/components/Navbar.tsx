import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["rooms", "amenities", "restaurant", "gallery", "booking"] as const;

const LOGO_URL =
  "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/caf55604-a6d6-4a2e-ad55-38ff7a29ed03_logo.png?v=b35f323c58137445fa5e370d5ca05b42";
const BOOKING_URL = "https://app.abremponghostel.com/book";
const WHATSAPP_URL = "https://wa.me/233256112666";

const navTransition = {
  duration: 0.7,
  ease: [0.32, 0.72, 0, 1] as const,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 md:px-4"
      >
        <div
          className={`mt-4 md:mt-5 w-full max-w-6xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "bg-dark-950/80 backdrop-blur-2xl shadow-2xl shadow-black/50 ring-1 ring-white/[0.06]"
              : "bg-white/[0.04] backdrop-blur-sm ring-1 ring-white/[0.08]"
          } rounded-full`}
        >
          <div className="flex items-center justify-between h-14 md:h-[4.25rem] px-5 md:px-8">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="Abrempong Hostel Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...navTransition, delay: 0.12 * i + 0.4 }}
                  onClick={() => scrollTo(item)}
                  className="relative text-white/70 hover:text-gold text-[11px] uppercase tracking-[0.18em] font-medium cursor-pointer whitespace-nowrap font-body transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...navTransition, delay: 0.9 }}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full ring-1 ring-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer"
                aria-label="Contact us on WhatsApp"
              >
                <i className="ri-whatsapp-line text-sm" />
              </motion.a>
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...navTransition, delay: 1.0 }}
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 bg-gold text-black text-[11px] uppercase tracking-[0.15em] rounded-full font-semibold hover:bg-gold-dark active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer whitespace-nowrap font-body"
              >
                Book Now
                <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <i className="ri-arrow-right-up-line text-xs" />
                </span>
              </motion.a>
            </div>

            {/* Mobile Hamburger — animated morph */}
            <button
              className="md:hidden relative w-8 h-8 flex items-center justify-center cursor-pointer z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                className="absolute block w-5 h-[1.5px] bg-white rounded-full"
                animate={
                  menuOpen
                    ? { rotate: 45, y: 0 }
                    : { rotate: 0, y: -4 }
                }
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              />
              <motion.span
                className="absolute block w-5 h-[1.5px] bg-white rounded-full"
                animate={
                  menuOpen
                    ? { rotate: -45, y: 0 }
                    : { rotate: 0, y: 4 }
                }
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay — full glass expansion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 w-full min-h-[100dvh] bg-dark-950/95 backdrop-blur-3xl md:hidden z-40 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.08 * i + 0.15,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  onClick={() => scrollTo(item)}
                  className="text-white/80 hover:text-gold text-xl sm:text-2xl uppercase tracking-[0.15em] sm:tracking-[0.25em] font-light cursor-pointer font-display transition-colors duration-500"
                >
                  {item}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="flex flex-col items-center gap-4 mt-8"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-7 py-3.5 ring-1 ring-white/20 text-white text-sm uppercase tracking-widest rounded-full hover:ring-whatsapp hover:text-whatsapp transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer font-body"
                >
                  <i className="ri-whatsapp-line text-lg" />
                  WhatsApp Us
                </a>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-gold text-black text-sm uppercase tracking-widest rounded-full font-semibold cursor-pointer whitespace-nowrap text-center font-body hover:bg-gold-dark active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  Book Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
