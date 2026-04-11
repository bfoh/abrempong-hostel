import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Kwame Asante",
    role: "University of Ghana Student",
    avatar: "https://readdy.ai/api/search-image?query=young%20Ghanaian%20male%20university%20student%20smiling%2C%20professional%20headshot%2C%20clean%20background%2C%20confident%20expression&width=100&height=100&seq=ava001&orientation=squarish",
    quote: "Living at Abrempong has been an absolute game-changer for my studies. The WiFi is fast, the environment is clean, and the security gives my parents peace of mind. Best decision I made!",
    rating: 5,
  },
  {
    id: 2,
    name: "Abena Mensah",
    role: "GIMPA Postgraduate Student",
    avatar: "https://readdy.ai/api/search-image?query=young%20Ghanaian%20female%20university%20student%20smiling%2C%20professional%20headshot%2C%20clean%20background%2C%20warm%20expression&width=100&height=100&seq=ava002&orientation=squarish",
    quote: "The rooms are spotless and the management is very responsive. I love how close it is to everything in Madina. The price is very fair for the quality you get. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emmanuel Boateng",
    role: "Young Professional, Accra",
    avatar: "https://readdy.ai/api/search-image?query=young%20Ghanaian%20male%20professional%20smiling%2C%20headshot%20portrait%2C%20clean%20background%2C%20smart%20casual%20attire&width=100&height=100&seq=ava003&orientation=squarish",
    quote: "I stayed here for 3 months while on a work assignment in Accra. The comfort level is way above what I expected for the price. Felt like home. Will definitely be back!",
    rating: 5,
  },
  {
    id: 4,
    name: "Ama Owusu",
    role: "Accra Technical University",
    avatar: "https://readdy.ai/api/search-image?query=young%20Ghanaian%20female%20student%20smiling%2C%20casual%20portrait%2C%20clean%20background%2C%20friendly%20expression&width=100&height=100&seq=ava004&orientation=squarish",
    quote: "The location is perfect — I can get to campus in 15 minutes. The rooms are always clean and the water supply is consistent. I&apos;ve recommended Abrempong to all my friends!",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="w-full bg-[#F8F6F3] py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[#C8A96A] text-xs uppercase tracking-[0.3em] mb-4">Testimonials</p>
          <div className="w-16 h-0.5 bg-[#C8A96A] mx-auto mb-6"></div>
          <h2
            className="text-[#0F0F0F] text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Residents Say
          </h2>
        </div>

        {/* Carousel */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Gold quote mark */}
            <span
              className="absolute top-6 left-8 text-[#C8A96A] text-8xl leading-none opacity-20 select-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <i key={i} className="ri-star-fill text-[#C8A96A] text-sm"></i>
              ))}
            </div>

            {/* Quote */}
            <p
              className="text-[#0F0F0F] text-lg md:text-xl leading-relaxed mb-8 relative z-10 italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{testimonials[current].quote}&rdquo;
            </p>

            {/* User */}
            <div className="flex items-center gap-4">
              <img
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                className="w-14 h-14 rounded-full object-cover object-top"
              />
              <div>
                <p className="text-[#0F0F0F] font-semibold text-sm">{testimonials[current].name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{testimonials[current].role}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8 justify-end">
              <button
                onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#0F0F0F]/20 hover:border-[#C8A96A] text-[#0F0F0F] hover:text-[#C8A96A] transition-all duration-300 cursor-pointer"
              >
                <i className="ri-arrow-left-line"></i>
              </button>
              <button
                onClick={() => setCurrent((current + 1) % testimonials.length)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C8A96A] text-black hover:bg-[#b8955a] transition-all duration-300 cursor-pointer"
              >
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "w-6 h-2 bg-[#C8A96A]" : "w-2 h-2 bg-[#C8A96A]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
