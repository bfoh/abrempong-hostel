import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const amenities = [
  { icon: "ri-wifi-line", label: "High-Speed WiFi", desc: "Reliable internet for study & streaming" },
  { icon: "ri-shield-check-line", label: "24/7 Security", desc: "CCTV, gated access & security personnel" },
  { icon: "ri-drop-line", label: "Water Supply", desc: "Consistent water supply, no interruptions" },
  { icon: "ri-flashlight-line", label: "Electricity", desc: "Stable power with backup generator" },
  { icon: "ri-map-pin-2-line", label: "Prime Location", desc: "Close to universities & transport links" },
  { icon: "ri-parking-box-line", label: "Parking Space", desc: "Secure on-site parking available" },
  { icon: "ri-boxing-line", label: "Gym & Fitness", desc: "On-site gym and exercise facilities" },
  { icon: "ri-gamepad-line", label: "Game Space", desc: "Recreation room for leisure time" },
  { icon: "ri-shirt-line", label: "Laundry", desc: "On-site laundry facilities" },
  { icon: "ri-store-2-line", label: "Minimart", desc: "Convenience store within the compound" },
  { icon: "ri-restaurant-line", label: "Restaurant", desc: "On-site dining options" },
  { icon: "ri-leaf-line", label: "Clean Environment", desc: "Regular cleaning & waste management" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
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

export default function Amenities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="amenities"
      className="w-full bg-dark-750 py-24 md:py-32"
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
            WHAT WE OFFER
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold font-display tracking-tight">
            Premium Amenities
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-lg mx-auto font-body">
            Everything you need for a comfortable and productive stay
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {amenities.map((item) => (
            <motion.div
              key={item.label}
              className="group rounded-[1.25rem] bg-white/[0.03] p-1 ring-1 ring-white/[0.06] hover:ring-gold/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-default"
              variants={cardVariants}
            >
              <div className="flex flex-col items-center text-center p-5 rounded-[calc(1.25rem-0.25rem)] bg-dark-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                <motion.div
                  className="w-14 h-14 flex items-center justify-center rounded-full ring-1 ring-gold/30 group-hover:ring-gold group-hover:bg-gold/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] mb-4"
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <i className={`${item.icon} text-gold text-xl`} />
                </motion.div>
                <h4 className="text-white text-[13px] font-semibold uppercase tracking-wider mb-2 font-body">
                  {item.label}
                </h4>
                <p className="text-white/35 text-xs leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
