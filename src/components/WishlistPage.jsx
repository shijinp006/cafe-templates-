import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCart } from "../lib/CartContext";
import { flyToCart } from "../lib/fly";
import { getMenuItemById } from "../data/menuItems";

function HeartFilledIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4 6 4c2.1 0 3.6 1.1 4.5 2.4C11.4 5.1 12.9 4 15 4c3.7 0 5.5 3.8 4 7.2-2.5 4.7-10 9.3-10 9.3z" />
    </svg>
  );
}

function WishlistPage({ onBack, onNavigateMenu }) {
  const cart = useCart();
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef({});

  const items = (cart?.wishlist || [])
    .map((id) => getMenuItemById(id))
    .filter(Boolean);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.15 }
        );
      }
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = (id) => {
    const el = cardRefs.current[id];
    if (!el) {
      cart.removeFromWishlist(id);
      return;
    }
    gsap.to(el, {
      opacity: 0,
      scale: 0.85,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => cart.removeFromWishlist(id),
    });
  };

  const handleAddToOrder = (id, el) => {
    cart.addToOrder(id, 1);
    const item = getMenuItemById(id);
    flyToCart(el, "order", item?.image);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B2D42] pt-20 sm:pt-24 pb-24 sm:pb-20 px-4 md:px-6 lg:px-20">
      <div
        ref={headerRef}
        className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-8 sm:mb-12 border-b border-[#2B2D42]/10 pb-6 sm:pb-8"
      >
        <div>
          <h1 className="brand-font text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2D42]">
            Your Wishlist
          </h1>
        </div>
        {items.length > 0 && (
          <span className="text-xs uppercase tracking-widest text-[#2B2D42]/50">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24">
          <div className="w-16 h-16 rounded-full bg-[#2B2D42]/[0.04] border border-[#2B2D42]/10 flex items-center justify-center mb-6 text-[#E76F51]/60">
            <span className="w-7 h-7">
              <HeartFilledIcon />
            </span>
          </div>
          <h2 className="brand-font text-xl md:text-2xl font-bold text-[#2B2D42] mb-3">
            Nothing saved yet
          </h2>
          <p className="text-[#2B2D42]/50 text-sm max-w-sm mb-8">
            Tap the heart icon on any menu item to save it here for later.
          </p>
          <button
            onClick={onNavigateMenu}
            className="px-8 py-3 bg-[#F4A261] hover:bg-[#E76F51] text-[#2B2D42] rounded-full text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {items.map((item) => (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[item.id] = el)}
              className="relative h-[290px] sm:h-[440px] rounded-xl sm:rounded-2xl border border-[#2B2D42]/10 bg-[#FFF3E6] overflow-hidden flex flex-col shadow-sm"
            >
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                aria-label="Remove from wishlist"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F4A261] text-[#2B2D42] flex items-center justify-center cursor-pointer active:scale-90 transition-transform shadow-sm"
              >
                <span className="w-4 h-4 sm:w-4 sm:h-4">
                  <HeartFilledIcon />
                </span>
              </button>

              <div className="relative w-full h-[55%] sm:h-[60%] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFF3E6] via-[#FFF3E6]/10 to-transparent" />
              </div>

              <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-1.5 mb-1">
                    <h3 className="brand-font text-xs sm:text-lg font-bold text-[#2B2D42] line-clamp-1 min-w-0 sm:flex-1">
                      {item.name}
                    </h3>
                    <span className="brand-font text-xs sm:text-xl font-bold text-[#E76F51] whitespace-nowrap shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[#2B2D42]/60 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={(e) => handleAddToOrder(item.id, e.currentTarget)}
                  className="mt-2 sm:mt-3 w-full py-2 sm:py-2.5 rounded-lg border border-[#F4A261]/50 bg-[#F4A261]/10 text-[#E76F51] hover:bg-[#F4A261] hover:text-[#2B2D42] text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
