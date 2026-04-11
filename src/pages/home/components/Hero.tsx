import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback image shown until video loads */}
        {!videoLoaded && (
          <img
            src="https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/5cdc9122-3349-49b1-a5db-272002ee1199_frontview.png?v=3bd85734415bcf6380f3b95220994fad"
            alt="Abrempong Hostel Madina Accra"
            className="w-full h-full object-cover object-top"
          />
        )}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source
            src="https://videos.pexels.com/video-files/29798054/12802115_640_360_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/29742817/12784987_640_360_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Eyebrow label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="block w-8 h-px bg-[#C8A96A]" />
            <p
              className="text-[#C8A96A] text-xs uppercase tracking-[0.35em]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Madina, Accra &nbsp;·&nbsp; Ghana
            </p>
            <span className="block w-8 h-px bg-[#C8A96A]" />
          </div>

          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Premium Living in the
            <br />
            <span className="text-[#C8A96A]">Heart of Madina</span>
          </h1>

          <p
            className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Where comfort meets convenience. Thoughtfully designed rooms for students, young professionals, and travelers seeking a refined stay in Accra.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("booking")}
              className="px-8 py-4 bg-[#C8A96A] text-black text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-[#b8955a] transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Book a Room
            </button>
            <button
              onClick={() => scrollTo("rooms")}
              className="px-8 py-4 border border-white/60 text-white text-sm uppercase tracking-widest rounded-full hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              View Rooms
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-14 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            { value: "200+", label: "Happy Residents" },
            { value: "4.8★", label: "Google Rating" },
            { value: "24/7", label: "Security" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-[#C8A96A] text-xl md:text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </p>
              <p
                className="text-white/60 text-[10px] uppercase tracking-widest mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[#C8A96A] text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <i className="ri-arrow-down-line text-[#C8A96A] text-lg"></i>
        </div>
      </div>
    </section>
  );
}
