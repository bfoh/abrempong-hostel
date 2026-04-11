import { useEffect, useRef, useState } from "react";

export default function Location() {
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

  const highlights = [
    { icon: "ri-building-2-line", text: "5 min from University of Ghana, Legon" },
    { icon: "ri-bus-line", text: "Walking distance to Madina Market & transport" },
    { icon: "ri-hospital-line", text: "Close to hospitals & health facilities" },
    { icon: "ri-shopping-bag-line", text: "Near shopping malls & restaurants" },
  ];

  return (
    <section id="location" className="w-full bg-white py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <p className="text-[#C8A96A] text-xs uppercase tracking-[0.3em] mb-4">Find Us</p>
            <div className="w-16 h-0.5 bg-[#C8A96A] mb-6"></div>
            <h2
              className="text-[#0F0F0F] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Perfectly Located
              <br />
              in Madina
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Strategically situated in the heart of Madina, Accra — one of the most vibrant and accessible neighborhoods in Greater Accra. Everything you need is within reach.
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map((h) => (
                <li key={h.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#C8A96A]/10 flex-shrink-0 mt-0.5">
                    <i className={`${h.icon} text-[#C8A96A] text-sm`}></i>
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed">{h.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-3 p-4 bg-[#F8F6F3] rounded-xl mb-6">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-2-fill text-[#C8A96A] text-xl"></i>
              </div>
              <div>
                <p className="text-[#0F0F0F] font-semibold text-sm">Abrempong Hostel</p>
                <p className="text-gray-500 text-sm mt-0.5">Madina, Greater Accra Region, Ghana</p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Madina,+Accra,+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#C8A96A] text-[#C8A96A] text-xs uppercase tracking-widest rounded-full hover:bg-[#C8A96A] hover:text-black transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-navigation-line"></i>
              Get Directions
            </a>
          </div>

          {/* Right: Map */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="rounded-2xl overflow-hidden border border-[#C8A96A]/20 h-[400px] md:h-[500px]">
              <iframe
                title="Abrempong Hostel Location - Madina Accra"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15882.123456789!2d-0.1634!3d5.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b3b3b3b3b3b%3A0x0!2sMadina%2C+Accra%2C+Ghana!5e0!3m2!1sen!2sgh!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
