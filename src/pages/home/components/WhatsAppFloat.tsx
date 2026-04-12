import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl =
    "https://wa.me/233256112666?text=Hello!%20I'm%20interested%20in%20booking%20a%20room%20at%20Abrempong%20Hostel%2C%20Madina.%20Please%20provide%20more%20details.";

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/25 cursor-pointer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5,
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full bg-whatsapp"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.4, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeOut",
            }}
          />
          {/* Second offset pulse for continuous effect */}
          <motion.span
            className="absolute inset-0 rounded-full bg-whatsapp"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.3, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeOut",
              delay: 1,
            }}
          />
          <i className="ri-whatsapp-line text-2xl relative z-10" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
