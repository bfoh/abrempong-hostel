import { useEffect, useRef, useState } from "react";

export default function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new URLSearchParams();
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      data.append(key, value.toString());
    });
    try {
      await fetch("https://readdy.ai/api/form/d77vojb86jhav3jpf05g", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      setSubmitted(true);
      form.reset();
      setCharCount(0);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMsg = encodeURIComponent(
    "Hello! I'm interested in booking a room at Abrempong Hostel, Madina. Please provide more details."
  );

  return (
    <section id="booking" className="w-full bg-[#0F0F0F] py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://readdy.ai/api/search-image?query=abstract%20dark%20texture%20pattern%2C%20subtle%20geometric%20lines%2C%20luxury%20background%2C%20dark%20charcoal&width=1920&height=1080&seq=bg001&orientation=landscape"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[#C8A96A] text-xs uppercase tracking-[0.3em] mb-4">Reserve Your Room</p>
          <div className="w-16 h-0.5 bg-[#C8A96A] mx-auto mb-6"></div>
          <h2
            className="text-white text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Book Your Stay
          </h2>
          <p className="text-white/50 text-base mt-4">Secure your space in minutes. We&apos;ll confirm within 24 hours.</p>
        </div>

        {/* Form Card */}
        <div
          className={`bg-white rounded-3xl p-8 md:p-10 transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#C8A96A]/10 mx-auto mb-4">
                <i className="ri-check-line text-[#C8A96A] text-3xl"></i>
              </div>
              <h3
                className="text-[#0F0F0F] text-2xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Booking Received!
              </h3>
              <p className="text-gray-500 text-sm">
                Thank you! We&apos;ll contact you within 24 hours to confirm your room.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 border border-[#C8A96A] text-[#C8A96A] text-xs uppercase tracking-widest rounded-full hover:bg-[#C8A96A] hover:text-black transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Book Another
              </button>
            </div>
          ) : (
            <form
              data-readdy-form
              id="abrempong-booking-form"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#0F0F0F] text-xs uppercase tracking-wider mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    placeholder="e.g. Kwame Asante"
                    className="w-full h-12 px-4 bg-[#F8F6F3] rounded-xl text-sm text-[#0F0F0F] placeholder-gray-400 border border-transparent focus:border-[#C8A96A] focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[#0F0F0F] text-xs uppercase tracking-wider mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+233 XX XXX XXXX"
                    className="w-full h-12 px-4 bg-[#F8F6F3] rounded-xl text-sm text-[#0F0F0F] placeholder-gray-400 border border-transparent focus:border-[#C8A96A] focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#0F0F0F] text-xs uppercase tracking-wider mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full h-12 px-4 bg-[#F8F6F3] rounded-xl text-sm text-[#0F0F0F] placeholder-gray-400 border border-transparent focus:border-[#C8A96A] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#0F0F0F] text-xs uppercase tracking-wider mb-2 font-medium">
                    Move-in Date *
                  </label>
                  <input
                    type="date"
                    name="move_in_date"
                    required
                    className="w-full h-12 px-4 bg-[#F8F6F3] rounded-xl text-sm text-[#0F0F0F] border border-transparent focus:border-[#C8A96A] focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[#0F0F0F] text-xs uppercase tracking-wider mb-2 font-medium">
                    Room Type *
                  </label>
                  <select
                    name="room_type"
                    required
                    className="w-full h-12 px-4 bg-[#F8F6F3] rounded-xl text-sm text-[#0F0F0F] border border-transparent focus:border-[#C8A96A] focus:outline-none transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">Select room type</option>
                    <option value="Standard Single">Standard Single — GH₵ 650/mo</option>
                    <option value="Deluxe Single">Deluxe Single — GH₵ 850/mo</option>
                    <option value="Shared Double">Shared Double — GH₵ 450/mo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#0F0F0F] text-xs uppercase tracking-wider mb-2 font-medium">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={500}
                  placeholder="Any special requirements or questions..."
                  onChange={(e) => setCharCount(e.target.value.length)}
                  className="w-full px-4 py-3 bg-[#F8F6F3] rounded-xl text-sm text-[#0F0F0F] placeholder-gray-400 border border-transparent focus:border-[#C8A96A] focus:outline-none transition-colors duration-300 resize-none"
                />
                <p className="text-right text-xs text-gray-400 mt-1">{charCount}/500</p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-14 bg-[#C8A96A] text-black text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-[#b8955a] hover:scale-[1.02] transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Confirm Booking"}
              </button>

              <a
                href={`https://wa.me/233244000000?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-14 flex items-center justify-center gap-3 border-2 border-[#25D366] text-[#25D366] text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-[#25D366] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-whatsapp-line text-xl"></i>
                Book via WhatsApp
              </a>

              <p className="text-center text-gray-400 text-xs flex items-center justify-center gap-2">
                <i className="ri-shield-check-line text-[#C8A96A]"></i>
                Secure booking &nbsp;·&nbsp; Instant confirmation
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
