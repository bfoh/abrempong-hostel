import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const FALLBACK_IMAGE =
  "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/5cdc9122-3349-49b1-a5db-272002ee1199_frontview.png";
const BOOKING_URL = "https://app.abremponghostel.com/book";
const WHATSAPP_URL = "https://wa.me/233256112666";

const premiumEase = [0.32, 0.72, 0, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 1.5,
      staggerChildren: 0.25,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: premiumEase },
  },
};

// Detect mobile for serving the right video file
const isMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth <= 768 ||
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const forcePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;
    video.muted = true;
    const p = video.play();
    if (p) p.catch(() => {});
  }, []);

  // Create the video element via DOM to bypass React's muted attribute bug.
  // React doesn't set the `muted` HTML attribute on <video>, only the JS property.
  // iOS Safari checks the HTML attribute when deciding autoplay eligibility.
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container || videoRef.current) return;

    const video = document.createElement("video");
    video.className =
      "absolute inset-0 w-full h-full object-cover";
    video.style.cssText =
      "-webkit-appearance:none;pointer-events:none;opacity:0;transition:opacity 1.5s cubic-bezier(0.32,0.72,0,1);";

    // Set ALL attributes as HTML attributes (not just JS properties)
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x5-playsinline", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("disablepictureinpicture", "");
    video.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
    video.setAttribute("poster", FALLBACK_IMAGE);

    // Also set JS properties
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.volume = 0;

    // Use the lighter mobile version on mobile devices
    const src = isMobile() ? "/herovideo-mobile.mp4#t=0.001" : "/herovideo.mp4#t=0.001";
    video.src = src;

    video.addEventListener("loadeddata", () => {
      video.style.opacity = "1";
      setVideoLoaded(true);
    });

    container.appendChild(video);
    videoRef.current = video;

    // Force load and play
    video.load();
    const p = video.play();
    if (p) p.catch(() => {});

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      container.removeChild(video);
      videoRef.current = null;
    };
  }, []);

  // Retry logic for stubborn iOS cases (low-power mode, slow cellular, etc.)
  useEffect(() => {
    const handleInteraction = () => {
      forcePlay();
      const video = videoRef.current;
      if (video && !video.paused) {
        document.removeEventListener("touchstart", handleInteraction);
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("scroll", handleInteraction);
      }
    };

    const handleVisibility = () => {
      if (!document.hidden) forcePlay();
    };

    document.addEventListener("touchstart", handleInteraction, { passive: true });
    document.addEventListener("click", handleInteraction, { passive: true });
    document.addEventListener("scroll", handleInteraction, { passive: true, once: true });
    document.addEventListener("visibilitychange", handleVisibility);

    // Periodic retry every 2s for 30s
    const interval = setInterval(forcePlay, 2000);
    const timeout = setTimeout(() => clearInterval(interval), 30000);

    return () => {
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [forcePlay]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {!videoLoaded && (
          <img
            src={FALLBACK_IMAGE}
            alt="Abrempong Hostel Madina Accra"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        )}
        {/* Video is injected here via DOM to bypass React's muted attribute bug */}
        <div ref={videoContainerRef} className="absolute inset-0 w-full h-full" />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      {/* Content with parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center px-5 md:px-6 text-center"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Gold divider + label */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-5 mb-6"
          >
            <span className="block w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            <p className="text-gold text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-body font-medium">
              Abrempong Hostel
            </p>
            <span className="block w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-white/80 text-sm md:text-base font-body font-light leading-relaxed max-w-md mb-12"
          >
            Premium Student Living in Madina, Accra
          </motion.p>

          {/* Two premium CTAs with Button-in-Button pattern */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 pl-7 pr-2 py-2 bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold rounded-full hover:bg-gold-dark active:scale-[0.97] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer whitespace-nowrap font-body min-w-[160px] sm:min-w-[180px] justify-center"
            >
              Book a Room
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110">
                <i className="ri-arrow-right-up-line text-sm" />
              </span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 pl-7 pr-2 py-2 ring-1 ring-white/40 text-white text-xs uppercase tracking-[0.15em] rounded-full hover:ring-whatsapp hover:text-whatsapp active:scale-[0.97] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer whitespace-nowrap font-body min-w-[160px] sm:min-w-[180px] justify-center"
            >
              WhatsApp Us
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-whatsapp/20 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110">
                <i className="ri-whatsapp-line text-sm" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1, ease: premiumEase }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-gold/60 text-[9px] uppercase tracking-[0.25em] font-body font-medium">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
