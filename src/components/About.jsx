import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Grass-Fed Beef", value: "100", unit: "%" },
  { label: "Flame Sear", value: "900", unit: "°F" },
  { label: "Buns Baked Daily", value: "1,200", unit: "+" },
  { label: "Freezers On Site", value: "0", unit: "" },
];

function About() {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
  const imgRef = useRef(null);

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

      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          imgRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.1, ease: "power4.out" },
          "-=0.2"
        )
        .from(
          "[data-reveal]",
          { opacity: 0, y: 40, duration: 0.8, stagger: 0.12 },
          "-=0.7"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full bg-[#050505] py-24 md:py-32 px-4 md:px-6 lg:px-20">
      <div
        ref={dividerRef}
        className="mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-16 origin-center"
      />
      <div className="w-full grid md:grid-cols-2 gap-16">
        <div data-reveal className="relative">
          <div className="absolute -inset-6 bg-amber-600/15 blur-3xl rounded-full opacity-60" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
            <img
              ref={imgRef}
              src="/images/about-burger.jpg"
              alt="EMBER signature cheeseburger studio render"
              className="relative w-full h-[340px] sm:h-[450px] md:h-[520px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        <div>
          <p data-reveal className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-4">
            About EMBER
          </p>
          <h2 data-reveal className="brand-font text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Crafted Without Shortcuts
          </h2>
          <p data-reveal className="text-gray-400 text-base md:text-lg leading-relaxed mb-10">
            EMBER was born from a single obsession: prove that fast food
            doesn't have to mean average food. Every bun is baked in-house,
            every patty hand-pressed and flame-seared to order, and every
            topping cut fresh the same day it's served.
          </p>

          <div className="grid grid-cols-2 gap-y-8 gap-x-6">
            {STATS.map((stat) => (
              <div data-reveal key={stat.label}>
                <div className="brand-font text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                  {stat.value}
                  <span className="text-lg md:text-xl ml-1">{stat.unit}</span>
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
