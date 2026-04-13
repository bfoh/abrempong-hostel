import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── Featured dishes for the accordion slider ── */
interface FeaturedDish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const featuredDishes: FeaturedDish[] = [
  {
    id: 1,
    name: "Fufu & Goat Soup",
    description:
      "Pounded cassava and plantain in aromatic light soup with slow-cooked goat meat and traditional spices.",
    price: "GHC 45",
    image: "/fufu.webp",
  },
  {
    id: 2,
    name: "Banku & Tilapia",
    description:
      "Fermented corn and cassava dough paired with grilled tilapia, fiery pepper sauce, and fresh tomatoes.",
    price: "GHC 35",
    image: "/Banku.webp",
  },
  {
    id: 3,
    name: "Waakye Special",
    description:
      "Rice and beans served with gari, spaghetti, shito, boiled egg, fried plantain, and your choice of protein.",
    price: "GHC 40",
    image: "/wakye.webp",
  },
  {
    id: 4,
    name: "Jollof & Fried Chicken",
    description:
      "Ghana's pride — smoky, tomato-rich jollof rice with crispy fried chicken and fresh salad on the side.",
    price: "GHC 40",
    image: "/jollof.webp",
  },
  {
    id: 5,
    name: "Rice Balls & Groundnut Soup",
    description:
      "Soft omo tuo swimming in rich, creamy groundnut soup with your choice of meat or fish.",
    price: "GHC 40",
    image: "/omo-tuo.webp",
  },
  {
    id: 6,
    name: "Kelewele",
    description:
      "Spicy fried plantain cubes seasoned with ginger, chilli, and cloves — the perfect evening snack.",
    price: "GHC 20",
    image: "/kelewele.jpeg",
  },
];

/* ── Full menu categories ── */
interface MenuItem {
  name: string;
  price: string;
}

interface MenuCategory {
  title: string;
  icon: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    title: "Main Rice",
    icon: "ri-bowl-line",
    items: [
      { name: "Jollof & Fried Chicken/Fish", price: "GHC 40" },
      { name: "Fried Rice & Fried Chicken/Fish", price: "GHC 45" },
      { name: "Plain Rice & Stew/Palava Sauce", price: "GHC 40" },
      { name: "Banku & Okro Soup (Plain)", price: "GHC 35" },
      { name: "Rice Balls & Soup", price: "GHC 40" },
      { name: "Fufu with Goat", price: "GHC 45" },
      { name: "Fufu with Chicken", price: "GHC 45" },
      { name: "Fufu with Crab/Shrimp (Package)", price: "GHC 50" },
    ],
  },
  {
    title: "Fish",
    icon: "ri-fish-line",
    items: [
      { name: "Stir Fried Fish Wing & Potato Chips", price: "GHC 40" },
      { name: "Stir Fried Fish Wing & Yam Chips", price: "GHC 40" },
      { name: "Chicken (Fried/Grilled) Extra", price: "+GHC 20" },
      { name: "Chicken with Yam/Potato Chips", price: "GHC 40" },
      { name: "Tilapia (Grilled)", price: "GHC 35" },
    ],
  },
  {
    title: "Salad",
    icon: "ri-leaf-line",
    items: [
      { name: "Tuna Salad", price: "GHC 35" },
      { name: "Assorted Fried Rice", price: "GHC 45" },
      { name: "Assorted Jollof", price: "GHC 45" },
      { name: "Abrempong Special Salad", price: "GHC 40" },
    ],
  },
  {
    title: "Indomie & Spaghetti",
    icon: "ri-restaurant-line",
    items: [
      { name: "Indomie with Groundnut Paste", price: "GHC 35" },
      { name: "Beans Stew & Fried Plantain", price: "GHC 30" },
      { name: "Spaghetti", price: "GHC 25" },
      { name: "Bread & Egg", price: "GHC 20" },
      { name: "Tom Brown", price: "GHC 20" },
      { name: "Wheat", price: "GHC 20" },
    ],
  },
  {
    title: "Extras",
    icon: "ri-add-circle-line",
    items: [
      { name: "Sausage (Extra)", price: "GHC 5" },
      { name: "Snail / Dry Fish", price: "GHC 30" },
      { name: "Meat", price: "GHC 20" },
      { name: "Goat", price: "GHC 25" },
      { name: "Wele", price: "GHC 10" },
      { name: "Chicken (Fried/Grilled)", price: "GHC 20" },
      { name: "Towel (Hot Towel)", price: "GHC 5" },
      { name: "Egg", price: "GHC 7" },
      { name: "Banku", price: "GHC 5" },
      { name: "Fufu", price: "GHC 5" },
      { name: "Crab", price: "GHC 30" },
    ],
  },
];

const premiumEase = [0.32, 0.72, 0, 1] as const;

const menuItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.03,
      ease: premiumEase,
    },
  }),
};

export default function Restaurant() {
  const sectionRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const isMenuInView = useInView(menuRef, { once: true, margin: "-60px" });
  const [activePanel, setActivePanel] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="restaurant"
      ref={sectionRef}
      className="w-full bg-dark-900 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 30, filter: "blur(6px)" }
          }
          transition={{ duration: 0.9, ease: premiumEase }}
        >
          <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
            Dine With Us
          </span>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight">
            Abrempong&rsquo;s Kitchen
          </h2>
          <p className="text-white/40 text-base mt-5 max-w-lg mx-auto font-body font-light">
            Authentic Ghanaian cuisine prepared fresh daily — right at your
            doorstep
          </p>
        </motion.div>

        {/* Hero Image with overlay text */}
        <motion.div
          className="relative w-full rounded-xl sm:rounded-[2rem] overflow-hidden mb-10 md:mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 1, delay: 0.2, ease: premiumEase }}
        >
          <div className="relative h-[240px] sm:h-[350px] md:h-[500px] overflow-hidden rounded-xl sm:rounded-[2rem]">
            <img
              src="/restaurant-hero.png"
              alt="Abrempong's Kitchen — traditional Ghanaian stew"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 via-transparent to-transparent" />

            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12">
              <motion.div
                className="flex items-center gap-3 mb-2 sm:mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: premiumEase }}
              >
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-body font-medium">
                  Open Daily &middot; 9 AM &ndash; 9 PM
                </span>
              </motion.div>
              <motion.h3
                className="text-white text-xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight mb-2 sm:mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.7, ease: premiumEase }}
              >
                Taste of Home,
                <br />
                <span className="text-gold-gradient">Every Single Day</span>
              </motion.h3>
              <motion.p
                className="text-white/60 text-xs sm:text-base font-body max-w-md"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8, ease: premiumEase }}
              >
                From breakfast to dinner, our chefs serve the rich flavours of
                Ghana so you never have to cook or leave the compound.
              </motion.p>
            </div>

            {/* Decorative gold corner */}
            <motion.div
              className="absolute top-3 right-3 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-xl sm:rounded-tr-2xl pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            />
          </div>
        </motion.div>

        {/* Accordion label */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
        >
          <p className="text-gold/60 text-[11px] uppercase tracking-[0.2em] font-body font-medium">
            <span className="hidden md:inline">Hover to explore our signatures</span>
            <span className="md:hidden">Tap to explore our signatures</span>
          </p>
        </motion.div>

        {/* ── Horizontal Accordion Slider (Desktop) ── */}
        <motion.div
          className="hidden md:flex gap-2 h-[70vh] min-h-[400px] max-h-[550px]"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: premiumEase }}
        >
          {featuredDishes.map((dish, i) => {
            const isActive = activePanel === i;
            return (
              <div
                key={dish.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  flex: isActive ? 5 : 1,
                  transition: "flex 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={() => setActivePanel(i)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-[600ms]"
                  style={{
                    backgroundImage: `url('${dish.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.88)] via-[rgba(5,5,5,0.2)] to-transparent" />

                {/* Collapsed vertical title */}
                <span
                  className="absolute bottom-7 left-4 text-[11px] font-semibold tracking-[0.08em] uppercase text-white/80 font-body transition-opacity duration-300"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    opacity: isActive ? 0 : 1,
                  }}
                >
                  {dish.name}
                </span>

                {/* Expanded content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div
                    className="transition-all duration-[400ms]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(8px)",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: "0.1s",
                    }}
                  >
                    <span className="text-gold text-[11px] tracking-[0.1em] uppercase font-body font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className="text-white text-xl sm:text-2xl font-semibold font-display tracking-tight mt-1 mb-1.5 transition-all duration-[400ms]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: "0.15s",
                    }}
                  >
                    {dish.name}
                  </h3>
                  <p
                    className="text-white/70 text-[13px] font-body leading-relaxed max-w-[30ch] mb-3 transition-all duration-[400ms]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: "0.2s",
                    }}
                  >
                    {dish.description}
                  </p>
                  <span
                    className="inline-block text-gold text-sm font-bold font-display tracking-wide transition-all duration-[400ms]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: "0.25s",
                    }}
                  >
                    from {dish.price}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ── Mobile: Vertical Accordion ── */}
        <motion.div
          className="flex flex-col gap-2 md:hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: premiumEase }}
        >
          {featuredDishes.map((dish, i) => {
            const isActive = activePanel === i;
            return (
              <div
                key={dish.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  height: isActive ? 260 : 56,
                  transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onClick={() => setActivePanel(activePanel === i ? -1 : i)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('${dish.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,5,5,0.85)] via-[rgba(5,5,5,0.4)] to-transparent" />

                {/* Collapsed */}
                <div
                  className="absolute top-1/2 left-5 -translate-y-1/2 text-[13px] font-medium font-body tracking-wide text-white z-10 transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <span className="text-gold/70 text-xs mr-3 font-normal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {dish.name}
                  <span className="text-gold/50 text-xs ml-3">{dish.price}</span>
                </div>

                {/* Expanded */}
                <div
                  className="absolute bottom-4 left-5 right-5 z-10 transition-all duration-[400ms]"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(10px)",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: "0.1s",
                  }}
                >
                  <h3 className="text-white text-lg font-semibold font-display mb-1">
                    {dish.name}
                  </h3>
                  <p className="text-white/70 text-xs font-body leading-relaxed max-w-[40ch] mb-1.5 line-clamp-3">
                    {dish.description}
                  </p>
                  <span className="text-gold text-sm font-bold font-display">
                    from {dish.price}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ── Full Menu Section ── */}
        <div ref={menuRef} className="mt-16 md:mt-24">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isMenuInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-5">
              Full Menu
            </span>
            <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight">
              What&rsquo;s Cooking Today
            </h3>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            className="flex gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar"
            initial={{ opacity: 0, y: 20 }}
            animate={isMenuInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
          >
            {menuCategories.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium font-body uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer flex-shrink-0 ${
                  activeCategory === i
                    ? "bg-gold text-black shadow-sm"
                    : "text-white/50 ring-1 ring-white/10 hover:ring-gold/30 hover:text-white/80"
                }`}
              >
                <i className={`${cat.icon} text-sm`} />
                {cat.title}
              </button>
            ))}
          </motion.div>

          {/* Menu items grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: premiumEase }}
              className="rounded-xl sm:rounded-[1.5rem] bg-white/[0.03] p-1 sm:p-1.5 ring-1 ring-white/[0.06]"
            >
              <div className="bg-dark-700 rounded-[calc(0.75rem-0.25rem)] sm:rounded-[calc(1.5rem-0.375rem)] p-5 sm:p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <i className={`${menuCategories[activeCategory].icon} text-gold text-lg`} />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-semibold font-display">
                      {menuCategories[activeCategory].title}
                    </h4>
                    <p className="text-white/30 text-[11px] font-body">
                      {menuCategories[activeCategory].items.length} items
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                  {menuCategories[activeCategory].items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-baseline justify-between py-3.5 border-b border-white/[0.06] last:border-b-0 group"
                    >
                      <span className="text-white/80 text-sm font-body group-hover:text-white transition-colors duration-300 pr-4">
                        {item.name}
                      </span>
                      <span className="text-gold text-sm font-bold font-display whitespace-nowrap flex-shrink-0">
                        {item.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Restaurant Info Bar ── */}
        <motion.div
          className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isMenuInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: premiumEase }}
        >
          {/* Hours */}
          <div className="flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-dark-700 border border-white/[0.06]">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <i className="ri-time-line text-gold text-lg" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold font-body">
                9 AM &ndash; 9 PM
              </p>
              <p className="text-white/40 text-xs font-body">Open Daily</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-dark-700 border border-white/[0.06]">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <i className="ri-map-pin-2-line text-gold text-lg" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold font-body">
                East Legon Branch
              </p>
              <p className="text-white/40 text-xs font-body">
                Opp. Havens Gate, Block C
              </p>
            </div>
          </div>

          {/* MoMo */}
          <div className="flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-dark-700 border border-white/[0.06]">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <i className="ri-smartphone-line text-gold text-lg" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold font-body">
                MoMo: 0553286846
              </p>
              <p className="text-white/40 text-xs font-body">
                Mobile Money Payment
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isMenuInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: premiumEase }}
        >
          <a
            href="https://wa.me/233256112666?text=Hi%2C%20I%27d%20like%20to%20order%20from%20Abrempong%27s%20Kitchen"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 pl-7 pr-2 py-2 bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold rounded-full hover:bg-gold-dark active:scale-[0.97] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer whitespace-nowrap font-body"
          >
            Order via WhatsApp
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110">
              <i className="ri-whatsapp-line text-sm" />
            </span>
          </a>
          <a
            href="tel:+233553286846"
            className="flex items-center gap-2 px-6 py-2.5 ring-1 ring-white/20 text-white/70 text-xs uppercase tracking-[0.15em] rounded-full hover:ring-gold hover:text-gold active:scale-[0.97] transition-all duration-500 cursor-pointer font-body"
          >
            <i className="ri-phone-line text-sm" />
            Call to Order
          </a>
        </motion.div>
      </div>
    </section>
  );
}
