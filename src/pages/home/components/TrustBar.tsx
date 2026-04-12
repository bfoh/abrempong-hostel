import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface AnimatedNumberProps {
  target: number;
  suffix?: string;
  decimals?: number;
  inView: boolean;
}

function AnimatedNumber({ target, suffix = "", decimals = 0, inView }: AnimatedNumberProps) {
  const [displaySuffix, setDisplaySuffix] = useState(false);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 30,
    restDelta: decimals > 0 ? 0.01 : 0.5,
  });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
    }
  }, [inView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toString();
        ref.current.textContent = formatted;
      }
      // Show suffix when we're close to target
      if (Math.abs(latest - target) < (decimals > 0 ? 0.1 : 1)) {
        setDisplaySuffix(true);
      }
    });
    return unsubscribe;
  }, [springValue, target, decimals]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={displaySuffix ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={displaySuffix ? "" : "opacity-0"}
      >
        {suffix}
      </motion.span>
    </span>
  );
}

const STATS = [
  { target: 200, suffix: "+", label: "Happy Residents", decimals: 0 },
  { target: 4.8, suffix: " \u2605", label: "Google Rating", decimals: 1 },
  { target: null, static: "24/7", label: "Security" },
  { target: 5, suffix: "+", label: "Years", decimals: 0 },
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  }),
};

export default function TrustBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-dark-850 py-10 md:py-12 border-y border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col items-center text-center"
            >
              <span className="text-gold font-display text-3xl md:text-4xl font-bold leading-none mb-2">
                {"static" in stat && stat.static ? (
                  stat.static
                ) : (
                  <AnimatedNumber
                    target={stat.target as number}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? (stat.decimals as number) : 0}
                    inView={inView}
                  />
                )}
              </span>
              <span className="text-white/50 font-body text-[11px] md:text-xs uppercase tracking-[0.18em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
