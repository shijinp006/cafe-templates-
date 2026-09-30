import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
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

      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }).from(
        "[data-reveal]",
        { opacity: 0, y: 40, duration: 0.8, stagger: 0.12 },
        "-=0.3"
      );
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
    <section id="contact" ref={sectionRef} className="relative w-full bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-6 lg:px-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl aspect-square rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

      <div
        ref={dividerRef}
        className="mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-16 origin-center"
      />
      <div className="max-w-4xl mx-auto text-center mb-16">
        <p data-reveal className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-4">
          Get In Touch
        </p>
        <h2 data-reveal className="brand-font text-3xl md:text-5xl font-bold text-white mb-6">
          Reserve Your Table
        </h2>
        <p data-reveal className="text-gray-400 max-w-xl mx-auto">
          Join us for lunch, dinner, or a late-night craving. Leave your
          details and our host team will confirm your reservation or help
          with catering.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        {submitted ? (
          <div
            ref={resultRef}
            className="border border-amber-600/30 bg-amber-600/5 rounded-2xl p-10 text-center"
          >
            <p className="brand-font text-amber-500 text-lg mb-2">Request Received</p>
            <p className="text-gray-400 text-sm">
              Thank you. An EMBER host will confirm your reservation shortly.
            </p>
          </div>
        ) : (
          <form data-reveal onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Jordan Blake"
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Tell us about your reservation, party size, or catering request..."
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-full font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transform hover:-translate-y-1"
            >
              RESERVE NOW
            </button>
          </form>
        )}
      </div>

      <footer className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="brand-font text-amber-500 tracking-widest">EMBER</div>
        <p className="text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} EMBER Burger Co. All rights reserved.
        </p>
      </footer>
    </section>
  );
}

export default Contact;
