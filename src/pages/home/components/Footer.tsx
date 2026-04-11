export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#1A1208] text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/caf55604-a6d6-4a2e-ad55-38ff7a29ed03_logo.png?v=b35f323c58137445fa5e370d5ca05b42"
                alt="Abrempong Hostel Logo"
                className="h-10 w-auto object-contain"
              />
              <span
                className="text-white font-semibold tracking-widest text-sm uppercase"
                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.15em" }}
              >
                Abrempong
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Premium student living in the heart of Madina, Accra. Comfort, security, and community — all in one place.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: "ri-instagram-line", href: "#" },
                { icon: "ri-facebook-circle-line", href: "#" },
                { icon: "ri-twitter-x-line", href: "#" },
                { icon: "ri-whatsapp-line", href: "https://wa.me/233244000000" },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#C8A96A]/30 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <i className={`${s.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C8A96A] text-xs uppercase tracking-[0.2em] mb-6 font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Rooms & Pricing", id: "rooms" },
                { label: "Amenities", id: "amenities" },
                { label: "Gallery", id: "gallery" },
                { label: "Location", id: "location" },
                { label: "Book a Room", id: "booking" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/60 hover:text-[#C8A96A] text-sm transition-colors duration-300 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C8A96A] text-xs uppercase tracking-[0.2em] mb-6 font-semibold">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-map-pin-2-line text-[#C8A96A] text-sm"></i>
                </div>
                <span className="text-white/60 text-sm leading-relaxed">Madina, Greater Accra Region, Ghana</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-phone-line text-[#C8A96A] text-sm"></i>
                </div>
                <a href="tel:+233244000000" className="text-white/60 hover:text-[#C8A96A] text-sm transition-colors duration-300 cursor-pointer">
                  +233 24 400 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-[#C8A96A] text-sm"></i>
                </div>
                <a href="mailto:info@abrempong.com" className="text-white/60 hover:text-[#C8A96A] text-sm transition-colors duration-300 cursor-pointer">
                  info@abrempong.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-whatsapp-line text-[#C8A96A] text-sm"></i>
                </div>
                <a
                  href="https://wa.me/233244000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#C8A96A] text-sm transition-colors duration-300 cursor-pointer"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Abrempong Hostel. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Madina, Accra, Ghana &nbsp;·&nbsp; Premium Student Accommodation
          </p>
        </div>
      </div>
    </footer>
  );
}
