import { useEffect, useState } from "react";

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const msg = encodeURIComponent(
    "Hello! I'm interested in booking a room at Abrempong Hostel, Madina. Please provide more details."
  );

  return (
    <a
      href={`https://wa.me/233244000000?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-all duration-500 cursor-pointer ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      title="Chat on WhatsApp"
    >
      <i className="ri-whatsapp-line text-2xl"></i>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
    </a>
  );
}
