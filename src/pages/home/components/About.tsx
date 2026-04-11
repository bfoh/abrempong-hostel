import { useEffect, useRef, useState } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "200+", label: "Happy Residents" },
    { value: "5+", label: "Years of Excellence" },
    { value: "24/7", label: "Security & Support" },
    { value: "4.9★", label: "Average Rating" },
  ];

  return (
    <section id="about" className="w-full bg-white py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-1000 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/695fb9e1-2382-46a1-9ce2-999bc99888fc_frontview2.png?v=135fccb58174298258a7111ed0b173f4"
                alt="Abrempong Hostel interior common area"
                className="w-full h-[500px] md:h-[600px] object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 md:right-6 bg-[#0F0F0F] text-white px-6 py-4 rounded-xl shadow-xl">
              <p className="text-[#C8A96A] text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Est. 2019</p>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Madina, Accra</p>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <p className="text-[#C8A96A] text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Who We Are
            </p>
            <div className="w-16 h-0.5 bg-[#C8A96A] mb-6"></div>
            <h2
              className="text-[#0F0F0F] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Refined Living
              <br />
              Experience
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              Abrempong Hostel is more than just a place to sleep — it&apos;s a thoughtfully curated living environment designed for students, young professionals, and travelers who value comfort, security, and community.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              Strategically located in Madina, Accra, we offer unmatched accessibility to major universities, transport hubs, markets, and the city center — making your daily life effortless and enjoyable.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
              Our rooms are clean, secure, and designed with your wellbeing in mind. From reliable electricity and water supply to high-speed WiFi and 24/7 security, every detail is handled so you can focus on what matters most.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-[#C8A96A] pl-4">
                  <p className="text-[#0F0F0F] text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
