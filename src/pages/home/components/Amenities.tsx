import { useEffect, useRef, useState } from "react";

const amenities = [
  { icon: "ri-wifi-line", label: "High-Speed WiFi", desc: "Reliable internet for study & streaming" },
  { icon: "ri-shield-check-line", label: "24/7 Security", desc: "CCTV, gated access & security personnel" },
  { icon: "ri-drop-line", label: "Water Supply", desc: "Consistent water supply, no interruptions" },
  { icon: "ri-flashlight-line", label: "Electricity", desc: "Stable power with backup generator" },
  { icon: "ri-map-pin-2-line", label: "Prime Location", desc: "Close to universities & transport links" },
  { icon: "ri-parking-box-line", label: "Parking Space", desc: "Secure on-site parking available" },
  { icon: "ri-restaurant-line", label: "Nearby Eateries", desc: "Restaurants & food vendors within walking distance" },
  { icon: "ri-leaf-line", label: "Clean Environment", desc: "Regular cleaning & waste management" },
];

export default function Amenities() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="amenities" className="w-full bg-[#0F0F0F] py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[#C8A96A] text-xs uppercase tracking-[0.3em] mb-4">What We Offer</p>
          <div className="w-16 h-0.5 bg-[#C8A96A] mx-auto mb-6"></div>
          <h2
            className="text-white text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Premium Amenities
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-lg mx-auto">
            Everything you need for a comfortable and productive stay
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {amenities.map((item, i) => (
            <div
              key={item.label}
              className={`group flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 hover:border-[#C8A96A]/50 hover:bg-white/5 transition-all duration-500 cursor-default ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#C8A96A]/40 group-hover:border-[#C8A96A] group-hover:bg-[#C8A96A]/10 transition-all duration-300 mb-4">
                <i className={`${item.icon} text-[#C8A96A] text-2xl`}></i>
              </div>
              <h4
                className="text-white text-sm font-semibold uppercase tracking-wider mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.label}
              </h4>
              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
