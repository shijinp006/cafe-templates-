import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import FoodDoodles from "./FoodDoodles";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INFO_ROWS = [
  { icon: "M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z", label: "Address", value: "123 Ember Street, Your City" },
  { icon: "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z", label: "Opening Hours", value: "Mon–Sun · 11:00 AM – 1:00 AM" },
  { icon: "M3 5a2 2 0 012-2h2.5l1.5 4-2 1.5a11 11 0 005.5 5.5L14 12l4 1.5V16a2 2 0 01-2 2A13 13 0 013 5z", label: "Phone", value: "+000 000 0000" },
  { icon: "M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z", label: "Email", value: "hello@ember.com" },
];

const FIELDS = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Jordan Blake" },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "date", label: "Date", type: "date" },
  { id: "time", label: "Time", type: "time" },
];

const inputClass =
  "w-full bg-white border border-[#2B2D42]/10 rounded-xl px-3.5 py-3 text-[#2B2D42] text-base placeholder-[#2B2D42]/40 focus:outline-none focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/20 transition";
const labelClass = "block text-[11px] uppercase tracking-widest text-[#2B2D42]/60 mb-1.5 font-semibold";

function Contact() {
  const sectionRef = useRef(null);
  const resultRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-reveal]", { opacity: 0, y: 40, duration: 0.8, stagger: 0.12 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!submitted || !resultRef.current) return;
    gsap.fromTo(
      resultRef.current,
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative isolate w-full bg-[#FFFDF9] pt-12 pb-28 md:py-16 px-4 md:px-6 lg:px-20 overflow-hidden">
      <FoodDoodles set="contact" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl aspect-square rounded-full bg-[#E76F51]/10 blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center mb-10">
        <p data-reveal className="text-[#E76F51] text-xs uppercase tracking-[0.3em] mb-4">
          Get In Touch
        </p>
        <h2 data-reveal className="brand-font text-3xl md:text-5xl font-bold text-[#2B2D42] mb-6">
          Reserve Your Table
        </h2>
        <p data-reveal className="text-[#2B2D42]/60 max-w-xl mx-auto">
          Join us for lunch, dinner, or a late-night craving. Leave your
          details and our host team will confirm your reservation or help
          with catering.
        </p>
      </div>

      <div
        data-reveal
        className="relative w-full grid lg:grid-cols-5 rounded-3xl overflow-hidden border border-[#2B2D42]/10 bg-[#2B2D42]/[0.03] backdrop-blur-sm shadow-[0_30px_80px_rgba(43,45,66,0.15)]"
      >
        {/* Info panel */}
        <aside className="lg:col-span-2 p-5 sm:p-8 md:p-10 bg-gradient-to-br from-[#E76F51]/20 via-[#7A3B2A]/10 to-transparent border-b lg:border-b-0 lg:border-r border-[#2B2D42]/10 flex flex-col gap-6 sm:gap-8">
          <div>
            <h3 className="brand-font text-xl text-[#2B2D42] mb-2 font-bold">Visit EMBER</h3>
            <p className="text-[#2B2D42]/60 text-sm leading-relaxed">
              Fire-grilled burgers, served hot. Book ahead for groups or ask us about catering.
            </p>
          </div>

          <ul className="space-y-4 sm:space-y-6 text-sm">
            {INFO_ROWS.map((row) => (
              <li key={row.label} className="flex items-start gap-3 sm:gap-4">
                <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F4A261]/10 border border-[#F4A261]/30 flex items-center justify-center text-[#E76F51]">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={row.icon} />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#E76F51]/80 mb-0.5 sm:mb-1 font-semibold">{row.label}</p>
                  <p className="text-[#2B2D42]/80 text-xs sm:text-sm">{row.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Form panel */}
        <div className="lg:col-span-3 p-5 sm:p-8 md:p-10">
          {submitted ? (
            <div ref={resultRef} className="h-full min-h-[320px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#F4A261]/10 border border-[#F4A261]/40 flex items-center justify-center text-[#E76F51] mb-5">
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="brand-font text-[#E76F51] text-xl mb-2">Request Received</p>
              <p className="text-[#2B2D42]/60 text-sm max-w-xs">
                Thank you. An EMBER host will confirm your reservation shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              {FIELDS.map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className={labelClass}>{f.label}</label>
                  <input id={f.id} type={f.type} required placeholder={f.placeholder} className={inputClass} />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label htmlFor="guests" className={labelClass}>Guests</label>
                <select id="guests" defaultValue="2" className={inputClass}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                  ))}
                  <option value="9+">9+ guests / catering</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>
                  Message <span className="normal-case tracking-normal text-[#2B2D42]/40">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows="3"
                  placeholder="Special requests, occasion, or catering details..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="sm:col-span-2 w-full px-8 py-3.5 bg-gradient-to-r from-[#E76F51] to-[#D95F41] hover:from-[#F4A261] hover:to-[#E76F51] text-[#FFFDF9] rounded-lg font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(231,111,81,0.3)] hover:shadow-[0_0_30px_rgba(231,111,81,0.5)] transform hover:-translate-y-1 cursor-pointer"
              >
                RESERVE NOW
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="w-full mt-12 pt-8 border-t border-[#2B2D42]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="brand-font text-[#E76F51] tracking-widest">EMBER</div>
        <p className="text-[#2B2D42]/60 text-xs">
          &copy; {new Date().getFullYear()} EMBER Burger Co. All rights reserved.
        </p>
      </footer>
    </section>
  );
}

export default Contact;
