import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import FoodDoodles from "./FoodDoodles";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardActions from "./CardActions";
import ExpandableText from "./ExpandableText";

gsap.registerPlugin(ScrollTrigger);

const MENU_ITEMS = [
  {
    id: "ember-signature",
    name: "Ember Signature",
    price: "AED 12",
    description: "Aged cheddar, hand-pressed grass-fed beef, toasted brioche, crisp lettuce and vine tomato.",
    image: "/images/about-burger.jpg",
  },
  {
    id: "double-flame",
    name: "Double Flame Smothered",
    price: "AED 15",
    description: "Double grass-fed beef patty, melted cheddar drip, smoked bacon, signature ember aioli.",
    image: "/images/menu/double-burger.jpg",
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    price: "AED 7",
    description: "Hand-cut fries, melted cheddar, crispy bacon, smoked chili aioli.",
    image: "/images/menu/loaded-fries.jpg",
  },
  {
    id: "charcoal-shake",
    name: "Charcoal Shake",
    price: "AED 6",
    description: "Activated-charcoal vanilla shake, whipped cream, toasted marshmallow.",
    image: "/images/menu/charcoal-shake.jpg",
  },
  {
    id: "ember-salad",
    name: "Ember Salad",
    price: "AED 9",
    description: "Charred romaine, cherry tomato, shaved parmesan, citrus vinaigrette.",
    image: "/images/menu/ember-salad.jpg",
  },
  {
    id: "sweet-tea",
    name: "Sweet Tea",
    price: "AED 4",
    description: "House-brewed black tea, lightly sweetened, served over ice.",
    image: "/images/menu/sweet-tea.jpg",
  },
];

function Products({ onViewFullMenu }) {
  const sectionRef = useRef(null);
  const menuItemRefs = useRef([]);
  const [mobileActiveId, setMobileActiveId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

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

      tl.from(
          "[data-reveal]",
          { opacity: 0, y: 40, duration: 0.8, stagger: 0.1 }
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
      className="relative isolate w-full bg-[#FFFDF9] py-12 md:py-16 px-4 md:px-6 lg:px-20 overflow-hidden"
    >
      <FoodDoodles set="products" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl aspect-square rounded-full bg-[#E76F51]/10 blur-[120px] pointer-events-none" />

      <div className="text-center mb-10">
        <p data-reveal className="text-[#E76F51] text-xs uppercase tracking-[0.3em] mb-4">
          The Menu
        </p>
        <h2 data-reveal className="brand-font text-3xl md:text-5xl font-bold text-[#2B2D42] mb-6">
          Fire-Built Favorites
        </h2>
        <p data-reveal className="text-[#2B2D42]/60 max-w-xl mx-auto">
          A short menu, done properly. Every item made to order, nothing
          frozen, nothing rushed.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {MENU_ITEMS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (menuItemRefs.current[i] = el)}
            onClick={() => window.innerWidth < 640 && setMobileActiveId((prev) => (prev === item.id ? null : item.id))}
            className="relative h-[285px] sm:h-[420px] rounded-xl sm:rounded-2xl border border-[#2B2D42]/10 bg-[#FFF3E6] overflow-hidden group hover:border-[#F4A261]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(244,162,97,0.15)] cursor-pointer shadow-sm"
          >
            <CardActions itemId={item.id} />

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
                <h3 className="brand-font text-xs sm:text-lg font-bold text-[#FFFDF9] line-clamp-1 min-w-0 sm:flex-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <span className="brand-font text-xs sm:text-xl font-bold text-[#F4A261] whitespace-nowrap shrink-0">
                    {item.price}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#F8B583] font-semibold sm:hidden">
                    Details ↓
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Panel: Details text panel shown on mobile tap or desktop hover */}
            <div
              className={`absolute bottom-0 inset-x-0 h-auto min-h-[50%] max-h-[85%] overflow-y-auto sm:h-1/2 sm:min-h-0 sm:max-h-none sm:overflow-visible bg-[#FFF3E6] p-3 sm:p-6 flex flex-col ${expandedId === item.id ? "justify-start gap-2" : "justify-between"} sm:justify-between border-t border-[#F4A261]/20 transform transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 ${mobileActiveId === item.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                } sm:translate-y-full sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100`}
            >
              <div className="flex items-baseline justify-between gap-1.5">
                <h3 className="brand-font text-xs sm:text-lg font-bold text-[#E76F51] line-clamp-1 min-w-0 sm:flex-1">
                  {item.name}
                </h3>
                <span className="brand-font text-xs sm:text-xl font-bold text-[#E76F51] whitespace-nowrap shrink-0">
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
                <p className="text-[#E76F51] text-[9px] sm:text-[10px] uppercase tracking-widest mb-0.5 sm:mb-1 font-semibold">
                  Details
                </p>
                <ExpandableText
                    text={item.description}
                    expanded={expandedId === item.id}
                    className="text-[#2B2D42]/80 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId((prev) => (prev === item.id ? null : item.id));
                    }}
                    className="sm:hidden mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#E76F51] cursor-pointer"
                  >
                    {expandedId === item.id ? "See less" : "See more"}
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div data-reveal className="text-center mt-12">
        <button
          onClick={onViewFullMenu}
          className="inline-block px-8 py-3 border border-[#F4A261]/40 hover:border-[#F4A261] text-[#E76F51] hover:text-[#E76F51] rounded-lg text-sm font-semibold tracking-wide uppercase transition-all hover:bg-[#E76F51]/10 cursor-pointer"
        >
          View Full Menu
        </button>
      </div>
    </section>
  );
}

export default Products;
