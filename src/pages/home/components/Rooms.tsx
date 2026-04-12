import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Room {
  id: number;
  name: string;
  occupancy: string;
  standardPrice: string;
  executivePrice?: string;
  image: string;
  standardFeatures: string[];
  executiveFeatures?: string[];
  badge: string;
  badgeClasses: string;
}

const rooms: Room[] = [
  {
    id: 1,
    name: "1-in-a-Room",
    occupancy: "Single Occupancy",
    standardPrice: "GHC 14,500",
    executivePrice: "GHC 17,500",
    image:
      "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/25b64b94-c753-4680-b19f-d57f708c5c8f_room.png?v=f3d1147f0c4b02da587c3f1d37ea8c2a",
    standardFeatures: [
      "Free Water Supply",
      "5kg Free Laundry Per Week",
      "24/7 Security",
      "Access to All Facilities",
    ],
    executiveFeatures: [
      "TV & Fridge Included",
      "Unlimited Free Internet",
      "Free Water Supply",
      "5kg Free Laundry Per Week",
      "24/7 Security",
      "Access to All Facilities",
    ],
    badge: "Premium",
    badgeClasses: "bg-gold text-black",
  },
  {
    id: 2,
    name: "2-in-a-Room",
    occupancy: "Double Occupancy",
    standardPrice: "GHC 7,500",
    executivePrice: "GHC 9,000",
    image:
      "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/7bd4479f-1871-4009-a249-99325649a936_backview2.png?v=dfd5746d377012f973c2d3c0da30031e",
    standardFeatures: [
      "Free Water Supply",
      "5kg Free Laundry Per Week",
      "24/7 Security",
      "Access to All Facilities",
    ],
    executiveFeatures: [
      "TV & Fridge Included",
      "Unlimited Free Internet",
      "Free Water Supply",
      "5kg Free Laundry Per Week",
      "24/7 Security",
      "Access to All Facilities",
    ],
    badge: "Best Value",
    badgeClasses: "bg-dark-750 text-gold ring-1 ring-gold/20",
  },
  {
    id: 3,
    name: "3-in-a-Room",
    occupancy: "Triple Occupancy",
    standardPrice: "GHC 6,200",
    image:
      "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/3bb46c26-5bf5-4381-a5d3-5a2852deeb9b_corridor.png?v=c4e54073835905b803650391d69f9ff6",
    standardFeatures: [
      "Free Water Supply",
      "5kg Free Laundry Per Week",
      "24/7 Security",
      "Access to All Facilities",
    ],
    badge: "Popular",
    badgeClasses: "ring-1 ring-gold/30 text-gold bg-dark-900/80 backdrop-blur-sm",
  },
  {
    id: 4,
    name: "4-in-a-Room",
    occupancy: "Quad Occupancy",
    standardPrice: "GHC 5,200",
    image: "/end.jpeg",
    standardFeatures: [
      "Free Water Supply",
      "5kg Free Laundry Per Week",
      "24/7 Security",
      "Access to All Facilities",
    ],
    badge: "Budget Friendly",
    badgeClasses: "ring-1 ring-white/20 text-white/70 bg-dark-900/80 backdrop-blur-sm",
  },
];

const premiumEase = [0.32, 0.72, 0, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: premiumEase,
    },
  }),
};

function RoomCard({ room, index, isInView }: { room: Room; index: number; isInView: boolean }) {
  const [isExecutive, setIsExecutive] = useState(false);
  const hasExecutive = !!room.executivePrice;
  const currentPrice = isExecutive && hasExecutive ? room.executivePrice : room.standardPrice;
  const currentFeatures = isExecutive && hasExecutive ? room.executiveFeatures! : room.standardFeatures;

  return (
    /* Double-Bezel: Outer Shell */
    <motion.div
      className="rounded-[1.5rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.06] group"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -6,
        transition: { duration: 0.5, ease: premiumEase },
      }}
    >
      {/* Inner Core */}
      <div className="bg-dark-700 rounded-[calc(1.5rem-0.375rem)] overflow-hidden flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full">
        {/* Image */}
        <div className="relative overflow-hidden h-52">
          <motion.img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover object-top"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: premiumEase }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-700/80 via-transparent to-transparent pointer-events-none" />
          <span
            className={`absolute top-4 right-4 text-[10px] font-semibold px-3 py-1.5 rounded-full ${room.badgeClasses}`}
          >
            {room.badge}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white text-lg font-semibold font-display">
              {room.name}
            </h3>
            <span className="text-white/30 text-[11px] font-body">{room.occupancy}</span>
          </div>

          {/* Executive Toggle */}
          {hasExecutive && (
            <div className="flex items-center gap-1.5 mb-4 mt-2 p-1 bg-dark-900 rounded-full w-fit">
              <button
                onClick={() => setIsExecutive(false)}
                className={`px-3.5 py-1.5 text-[11px] rounded-full font-body font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                  !isExecutive
                    ? "bg-gold text-black shadow-sm"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setIsExecutive(true)}
                className={`px-3.5 py-1.5 text-[11px] rounded-full font-body font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                  isExecutive
                    ? "bg-gold text-black shadow-sm"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Executive
              </button>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-5">
            <motion.span
              key={currentPrice}
              className="text-gold text-2xl font-bold font-display"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: premiumEase }}
            >
              {currentPrice}
            </motion.span>
            <span className="text-white/40 text-[11px] font-body">/semester</span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 mb-4" />

          {/* Features */}
          <motion.ul
            key={isExecutive ? "exec" : "std"}
            className="space-y-2.5 mb-6 flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: premiumEase }}
          >
            {currentFeatures.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 text-white/60 text-sm font-body"
              >
                <i className="ri-check-line text-gold text-base flex-shrink-0" />
                {f}
              </li>
            ))}
          </motion.ul>

          {/* Power Note */}
          <p className="text-white/25 text-[11px] font-body mb-4 flex items-center gap-1.5">
            <i className="ri-flashlight-line text-gold/40 text-[10px]" />
            Power usage billed separately
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-2.5 mt-auto">
            <a
              href="https://app.abremponghostel.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta flex-1 flex items-center justify-center gap-2 py-3 bg-gold text-black text-[11px] uppercase tracking-[0.12em] rounded-full hover:bg-gold-dark active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer whitespace-nowrap font-semibold font-body"
            >
              Check Availability
            </a>
            <a
              href="https://wa.me/233256112666"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full ring-1 ring-whatsapp/30 text-whatsapp hover:bg-whatsapp hover:text-white active:scale-[0.95] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              aria-label="Contact on WhatsApp"
            >
              <i className="ri-whatsapp-line text-lg" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Rooms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="rooms"
      className="w-full bg-dark-900 py-24 md:py-32 overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(6px)" }}
          transition={{ duration: 0.9, ease: premiumEase }}
        >
          <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
            Our Rooms
          </span>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight">
            Choose Your Space
          </h2>
          <p className="text-white/40 text-base mt-5 max-w-lg mx-auto font-body font-light">
            Rates per semester per bed — all rooms include utilities
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
