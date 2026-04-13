import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What's included in the rent?",
    answer:
      "Your rent covers accommodation, 24/7 security, free water supply, 5kg free laundry per week, and access to all shared facilities including the gym, game room, and astroturf. Executive rooms additionally include a TV, fridge, and unlimited free internet. Please note that occupants pay for their own power/electricity usage.",
  },
  {
    question: "How much are the rooms?",
    answer:
      "Rates are per semester per bed. 1-in-a-Room: GHC 14,500 (Standard) or GHC 17,500 (Executive). 2-in-a-Room: GHC 7,500 (Standard) or GHC 9,000 (Executive). 3-in-a-Room: GHC 6,200. 4-in-a-Room: GHC 5,200. Executive rooms include TV, fridge, and unlimited internet.",
  },
  {
    question: "How do I book a room?",
    answer:
      "You can book directly through our online booking portal, via WhatsApp, or by visiting our office in Madina. All payments must be made in full before commencement of stay. Rooms are allocated on a first-come, first-served basis — as and when you pay. No reservation is guaranteed without payment.",
  },
  {
    question: "What are the payment options?",
    answer:
      "We accept mobile money, bank transfer, and cash payments. For hostel and gym bookings, send MoMo to 0556218659. For laundry services, send MoMo to 0552222594 (Abrempong Laundry). All payments must be made in full before your stay begins.",
  },
  {
    question: "Do I pay for electricity?",
    answer:
      "Yes, occupants pay for their own power/electricity usage. This is billed separately from your room rate. All other utilities — water, laundry (5kg/week), and internet (Executive rooms) — are included in your rent.",
  },
  {
    question: "What's the move-in process?",
    answer:
      "Once your payment is made in full, your room is allocated immediately. You'll receive your room key/keycard, facility guidelines, and emergency contacts. Our team will give you a tour of the facilities on move-in day.",
  },
  {
    question: "What's the difference between Standard and Executive?",
    answer:
      "Executive rooms (available for 1-in-a-Room and 2-in-a-Room) include a TV, fridge, and unlimited free internet in addition to all standard utilities. Standard rooms include free water and 5kg free laundry per week.",
  },
  {
    question: "Are there house rules?",
    answer:
      "Yes, we maintain a respectful community environment. Quiet hours are 10pm-6am, visitors must sign in at reception, no smoking inside the building, and all residents must keep their rooms and shared spaces clean.",
  },
  {
    question: "Is there a caretaker on site?",
    answer:
      "Yes, we have a dedicated facility manager and maintenance team on site during business hours, and security personnel available 24/7 for emergencies.",
  },
  {
    question: "Can I visit before booking?",
    answer:
      "Absolutely! We encourage prospective residents to visit and tour the facility. Contact us on WhatsApp or call to schedule a visit at a convenient time.",
  },
];

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="border-b border-white/10"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.07,
        ease: "easeOut",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium text-sm md:text-base pr-8 font-body group-hover:text-gold transition-colors duration-300">
          {item.question}
        </span>
        <motion.span
          className="text-gold text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <i className="ri-add-line" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/60 text-sm leading-relaxed pb-5 md:pb-6 pr-12 font-body">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="w-full bg-dark-750 py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium font-body text-gold ring-1 ring-gold/20 mb-6">
            FAQ
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold font-display tracking-tight mb-4">
            Common Questions
          </h2>
          <p className="text-white/40 text-base font-body">
            Everything you need to know before booking
          </p>
        </motion.div>

        {/* Accordion */}
        <div>
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
