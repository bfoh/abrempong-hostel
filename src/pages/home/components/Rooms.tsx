import { useEffect, useRef, useState } from "react";

const rooms = [
  {
    id: 1,
    name: "Standard Single Room",
    price: "GH₵ 650",
    period: "/month",
    image: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/25b64b94-c753-4680-b19f-d57f708c5c8f_room.png?v=f3d1147f0c4b02da587c3f1d37ea8c2a",
    features: ["High-Speed WiFi", "Study Desk & Chair", "Wardrobe Storage", "Shared Bathroom"],
    badge: "Most Popular",
    badgeColor: "bg-[#C8A96A] text-black",
  },
  {
    id: 2,
    name: "Deluxe Single Room",
    price: "GH₵ 850",
    period: "/month",
    image: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/7bd4479f-1871-4009-a249-99325649a936_backview2.png?v=dfd5746d377012f973c2d3c0da30031e",
    features: ["High-Speed WiFi", "Private Bathroom", "Air Conditioning", "Study Desk & Chair"],
    badge: "Best Value",
    badgeColor: "bg-[#0F0F0F] text-[#C8A96A]",
  },
  {
    id: 3,
    name: "Shared Double Room",
    price: "GH₵ 450",
    period: "/month",
    image: "https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/3bb46c26-5bf5-4381-a5d3-5a2852deeb9b_corridor.png?v=c4e54073835905b803650391d69f9ff6",
    features: ["High-Speed WiFi", "Shared Bathroom", "Study Area", "Wardrobe per Person"],
    badge: "Budget Friendly",
    badgeColor: "bg-white text-[#0F0F0F] border border-[#C8A96A]",
  },
];

export default function Rooms() {
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
    <section id="rooms" className="w-full bg-[#F8F6F3] py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[#C8A96A] text-xs uppercase tracking-[0.3em] mb-4">Accommodation</p>
          <div className="w-16 h-0.5 bg-[#C8A96A] mx-auto mb-6"></div>
          <h2
            className="text-[#0F0F0F] text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Choose Your Space
          </h2>
          <p className="text-gray-500 text-base mt-4 max-w-lg mx-auto">
            Thoughtfully designed rooms for every lifestyle and budget
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <div
              key={room.id}
              className={`bg-white rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${room.badgeColor}`}>
                  {room.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-[#0F0F0F] text-xl font-semibold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {room.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-[#C8A96A] text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {room.price}
                  </span>
                  <span className="text-gray-400 text-sm">{room.period}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {room.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-600 text-sm">
                      <i className="ri-check-line text-[#C8A96A] text-base"></i>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://app.abremponghostel.com/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 border border-[#C8A96A] text-[#C8A96A] text-xs uppercase tracking-widest rounded-full hover:bg-[#C8A96A] hover:text-black transition-all duration-300 cursor-pointer whitespace-nowrap font-medium text-center"
                >
                  Check Availability
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
