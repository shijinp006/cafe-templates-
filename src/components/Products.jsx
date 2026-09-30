import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MENU_ITEMS = [
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    price: "$7",
    description: "Hand-cut fries, melted cheddar, crispy bacon, smoked chili aioli.",
    image: "/images/menu/loaded-fries.jpg",
  },
  {
    id: "charcoal-shake",
    name: "Charcoal Shake",
    price: "$6",
    description: "Activated-charcoal vanilla shake, whipped cream, toasted marshmallow.",
    image: "/images/menu/charcoal-shake.jpg",
  },
  {
    id: "ember-salad",
    name: "Ember Salad",
    price: "$9",
    description: "Charred romaine, cherry tomato, shaved parmesan, citrus vinaigrette.",
    image: "/images/menu/ember-salad.jpg",
  },
  {
    id: "sweet-tea",
    name: "Sweet Tea",
    price: "$4",
    description: "House-brewed black tea, lightly sweetened, served over ice.",
    image: "/images/menu/sweet-tea.jpg",
  },
];

function Products({ onViewFullMenu }) {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
  const menuItemRefs = useRef([]);
  const [mobileActiveId, setMobileActiveId] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(menuItemRefs.current, { opacity: 0, y: 40 });

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
        .from(
          "[data-reveal]",
          { opacity: 0, y: 40, duration: 0.8, stagger: 0.1 },
          "-=0.3"
        )
        .to(
          menuItemRefs.current,
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "<"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-6 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl aspect-square rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

      <div
        ref={dividerRef}
        className="mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-16 origin-center"
      />

      <div className="text-center mb-16">
        <p data-reveal className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-4">
          The Menu
        </p>
        <h2 data-reveal className="brand-font text-3xl md:text-5xl font-bold text-white mb-6">
          Fire-Built Favorites
        </h2>
        <p data-reveal className="text-gray-400 max-w-xl mx-auto">
          A short menu, done properly. Every item made to order, nothing
          frozen, nothing rushed.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
        {MENU_ITEMS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (menuItemRefs.current[i] = el)}
            onClick={() => setMobileActiveId((prev) => (prev === item.id ? null : item.id))}
            className="relative h-[260px] sm:h-[420px] rounded-xl sm:rounded-2xl border border-white/10 bg-[#121212] overflow-hidden group hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] cursor-pointer"
          >
            {/* Image Container: Full height resting state, contracts to top half (h-1/2) on desktop hover or mobile tap */}
            <div
              className={`absolute top-0 inset-x-0 transition-all duration-500 ease-out overflow-hidden z-0 ${mobileActiveId === item.id ? "h-1/2" : "h-full"
                } sm:h-full sm:group-hover:h-1/2`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                loading="lazy"
              />

              {/* Resting State Overlay: Title, Price & Details button hint */}
              <div
                className={`absolute bottom-0 inset-x-0 p-2.5 sm:p-5 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-1 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 ${mobileActiveId === item.id ? "opacity-0 pointer-events-none" : "opacity-100"
                  } sm:group-hover:opacity-0`}
              >
                <h3 className="brand-font text-xs sm:text-lg font-bold text-white line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <span className="brand-font text-xs sm:text-xl font-bold text-amber-500">
                    {item.price}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-amber-400/90 font-semibold sm:hidden">
                    Details ↓
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Panel: Details text panel shown on mobile tap or desktop hover */}
            <div
              className={`absolute bottom-0 inset-x-0 h-1/2 bg-[#121212] p-3 sm:p-6 flex flex-col justify-between border-t border-amber-500/20 transform transition-all duration-500 ease-out z-20 ${mobileActiveId === item.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                } sm:translate-y-full sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100`}
            >
              <div className="flex items-baseline justify-between gap-1.5">
                <h3 className="brand-font text-xs sm:text-lg font-bold text-amber-400 line-clamp-1">
                  {item.name}
                </h3>
                <span className="brand-font text-xs sm:text-xl font-bold text-amber-500 shrink-0">
                  {item.price}
                </span>
              </div>

              {/* Description Text */}
              <div
                className={`transform transition-all duration-500 delay-100 ease-out ${mobileActiveId === item.id
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0"
                  } sm:-translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100`}
              >
                <p className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-widest mb-0.5 sm:mb-1 font-semibold">
                  Details
                </p>
                <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div data-reveal className="text-center mt-12">
        <button
          onClick={onViewFullMenu}
          className="inline-block px-8 py-3 border border-amber-600/40 hover:border-amber-500 text-amber-500 hover:text-amber-400 rounded-full text-sm font-semibold tracking-wide uppercase transition-all hover:bg-amber-600/10 cursor-pointer"
        >
          View Full Menu
        </button>
      </div>
    </section>
  );
}

export default Products;
