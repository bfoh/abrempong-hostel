import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Booking() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

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
      // silent fail
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl =
    "https://wa.me/233256112666?text=Hello!%20I'm%20interested%20in%20booking%20a%20room%20at%20Abrempong%20Hostel%2C%20Madina.%20Please%20provide%20more%20details.";

  const inputClasses =
    "w-full h-12 px-5 bg-dark-900 rounded-2xl text-sm text-white placeholder-white/25 ring-1 ring-white/[0.06] focus:ring-gold/60 focus:outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] font-body";

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="w-full bg-dark-850 py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
            BOOK NOW
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold font-display tracking-tight">
            Ready to Move In?
          </h2>
          <p className="text-white/50 text-base mt-4 font-body">
            Secure your space in minutes
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT — Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-[1.75rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.06]"
          >
            <div className="bg-dark-700 rounded-[calc(1.75rem-0.375rem)] p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gold/10 mx-auto mb-6">
                  <i className="ri-check-double-line text-gold text-4xl" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-3 font-display">
                  Booking Received
                </h3>
                <p className="text-white/50 text-sm font-body mb-8 max-w-sm mx-auto">
                  Thank you! We&apos;ll contact you within 24 hours to confirm
                  your room.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 border border-gold text-gold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer font-body font-semibold"
                >
                  Book Another Room
                </button>
              </div>
            ) : (
              <form
                data-readdy-form
                id="abrempong-booking-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <h3 className="text-white text-xl font-bold font-display mb-2">
                  Book Online
                </h3>
                <p className="text-white/40 text-sm font-body mb-4">
                  Fill in your details and we&apos;ll confirm within 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 font-body font-medium">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      placeholder="e.g. Kwame Asante"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 font-body font-medium">
                      Phone Number <span className="text-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+233 XX XXX XXXX"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 font-body font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className={inputClasses}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 font-body font-medium">
                      Move-in Date <span className="text-gold">*</span>
                    </label>
                    <input
                      type="date"
                      name="move_in_date"
                      required
                      className={`${inputClasses} [color-scheme:dark]`}
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 font-body font-medium">
                      Room Type <span className="text-gold">*</span>
                    </label>
                    <select
                      name="room_type"
                      required
                      className={`${inputClasses} cursor-pointer`}
                    >
                      <option value="">Select room type</option>
                      <option value="1-in-a-Room Standard">
                        1-in-a-Room Standard — GHC 14,500/sem
                      </option>
                      <option value="1-in-a-Room Executive">
                        1-in-a-Room Executive — GHC 17,500/sem
                      </option>
                      <option value="2-in-a-Room Standard">
                        2-in-a-Room Standard — GHC 7,500/sem
                      </option>
                      <option value="2-in-a-Room Executive">
                        2-in-a-Room Executive — GHC 9,000/sem
                      </option>
                      <option value="3-in-a-Room">
                        3-in-a-Room — GHC 6,200/sem
                      </option>
                      <option value="4-in-a-Room">
                        4-in-a-Room — GHC 5,200/sem
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-2 font-body font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={500}
                    placeholder="Any special requirements or questions..."
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className="w-full px-5 py-3 bg-dark-900 rounded-2xl text-sm text-white placeholder-white/25 ring-1 ring-white/[0.06] focus:ring-gold/60 focus:outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] resize-none font-body"
                  />
                  <p className="text-right text-xs text-white/30 mt-1 font-body">
                    {charCount}/500
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-14 bg-gold text-black text-sm uppercase tracking-wider sm:tracking-widest font-semibold rounded-full hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-60 font-body"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin text-lg" />
                      Sending...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </form>
            )}
            </div>
          </motion.div>

          {/* RIGHT — WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Main WhatsApp CTA */}
            <div className="rounded-[1.75rem] bg-white/[0.03] p-1.5 ring-1 ring-whatsapp/10 flex-1"><div className="bg-dark-700 rounded-[calc(1.75rem-0.375rem)] p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative overflow-hidden flex flex-col justify-center h-full">
              {/* Green glow accent */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-whatsapp/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-whatsapp/10 mb-8">
                  <i className="ri-whatsapp-line text-whatsapp text-4xl" />
                </div>

                <h3 className="text-white text-2xl md:text-3xl font-bold font-display mb-4">
                  Prefer to Chat?
                </h3>
                <p className="text-white/50 text-base font-body mb-8 leading-relaxed max-w-md">
                  Send us a message on WhatsApp and we&apos;ll respond within
                  minutes. Get instant answers about rooms, pricing, and
                  availability.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 flex items-center justify-center gap-3 bg-whatsapp text-white text-sm uppercase tracking-wider sm:tracking-widest font-semibold rounded-full hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer whitespace-nowrap font-body mb-8"
                >
                  <i className="ri-whatsapp-line text-xl" />
                  Chat on WhatsApp
                </a>

                {/* Call directly */}
                <div className="text-center mb-8">
                  <p className="text-white/40 text-sm font-body mb-2">
                    Or call us directly
                  </p>
                  <a
                    href="tel:+233256112666"
                    className="text-gold text-lg font-semibold font-body hover:text-gold-light transition-colors duration-300"
                  >
                    <i className="ri-phone-line mr-2" />
                    +233 25 611 2666
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2 text-white/50 text-sm font-body">
                      <i className="ri-shield-check-line text-gold" />
                      <span>Secure booking</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm font-body">
                      <i className="ri-flashlight-line text-gold" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm font-body">
                      <i className="ri-time-line text-gold" />
                      <span>24/7 support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
