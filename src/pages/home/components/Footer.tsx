import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: "ri-instagram-line", href: "https://instagram.com/abremponghostel", label: "Instagram" },
    { icon: "ri-facebook-circle-line", href: "https://facebook.com/abremponghostel", label: "Facebook" },
    { icon: "ri-tiktok-line", href: "https://tiktok.com/@abremponghostel", label: "TikTok" },
    {
      icon: "ri-whatsapp-line",
      href: "https://wa.me/233256112666",
      label: "WhatsApp",
    },
  ];

  const quickLinks = [
    { label: "Rooms & Pricing", id: "rooms" },
    { label: "Amenities", id: "amenities" },
    { label: "Gallery", id: "gallery" },
    { label: "Location", id: "location" },
    { label: "Book a Room", id: "booking" },
  ];

  const contactItems = [
    {
      icon: "ri-map-pin-2-line",
      text: "Madina, Greater Accra Region, Ghana",
      href: undefined,
    },
    {
      icon: "ri-phone-line",
      text: "+233 25 611 2666",
      href: "tel:+233256112666",
    },
    {
      icon: "ri-mail-line",
      text: "info@abrempong.com",
      href: "mailto:info@abrempong.com",
    },
    {
      icon: "ri-whatsapp-line",
      text: "WhatsApp Us",
      href: "https://wa.me/233256112666",
      external: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const },
    },
  };

  return (
    <footer ref={footerRef} className="w-full bg-dark-950 text-white pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16"
        >
          {/* Column 1 — Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/caf55604-a6d6-4a2e-ad55-38ff7a29ed03_logo.png?v=b35f323c58137445fa5e370d5ca05b42"
                alt="Abrempong Hostel Logo"
                className="h-12 w-auto object-contain"
              />
              <span className="text-gold font-display font-semibold tracking-[0.15em] text-sm uppercase">
                Abrempong
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs font-body">
              Premium student living in the heart of Madina, Accra.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <i className={`${s.icon} text-base`} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] mb-6 font-body font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300 cursor-pointer font-body group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-gold transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] mb-6 font-body font-semibold">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              {contactItems.map((item) => (
                <li key={item.icon} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`${item.icon} text-gold text-sm`} />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={
                        item.external ? "noopener noreferrer" : undefined
                      }
                      className="text-white/60 hover:text-gold text-sm transition-colors duration-300 cursor-pointer font-body"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-white/60 text-sm leading-relaxed font-body">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-xs font-body">
            &copy; {new Date().getFullYear()} Abrempong Hostel. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-white/30 text-xs font-body flex-wrap justify-center">
            <span>Madina, Accra, Ghana</span>
            <span>&middot;</span>
            <button onClick={() => scrollTo("faq")} className="hover:text-gold transition-colors duration-300 cursor-pointer">Privacy Policy</button>
            <span>&middot;</span>
            <button onClick={() => scrollTo("faq")} className="hover:text-gold transition-colors duration-300 cursor-pointer">Terms</button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
