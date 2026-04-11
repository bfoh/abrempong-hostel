import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F0F0F]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://storage.readdy-site.link/project_files/af5bd58b-f754-41f5-9d59-5c72abe3f6ed/caf55604-a6d6-4a2e-ad55-38ff7a29ed03_logo.png?v=b35f323c58137445fa5e370d5ca05b42"
            alt="Abrempong Hostel Logo"
            className="h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["rooms", "amenities", "gallery", "booking"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-white/80 hover:text-[#C8A96A] text-xs uppercase tracking-widest transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/233244000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#C8A96A]/60 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black transition-all duration-300 cursor-pointer"
          >
            <i className="ri-whatsapp-line text-base"></i>
          </a>
          <button
            onClick={() => scrollTo("booking")}
            className="px-5 py-2 border border-[#C8A96A] text-[#C8A96A] text-xs uppercase tracking-widest rounded-full hover:bg-[#C8A96A] hover:text-black transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F0F0F]/98 backdrop-blur-md px-6 pb-6 pt-2 flex flex-col gap-4">
          {["rooms", "amenities", "gallery", "booking"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-white/80 hover:text-[#C8A96A] text-sm uppercase tracking-widest text-left py-2 border-b border-white/10 transition-colors duration-300 cursor-pointer"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("booking")}
            className="mt-2 px-5 py-3 bg-[#C8A96A] text-black text-xs uppercase tracking-widest rounded-full font-semibold cursor-pointer whitespace-nowrap"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}
