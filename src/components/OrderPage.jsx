import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useCart } from "../lib/CartContext";
import { getMenuItemById, priceToNumber } from "../data/menuItems";

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <path d="M2.5 3h2l2.2 11.2a1.8 1.8 0 0 0 1.78 1.5h7.6a1.8 1.8 0 0 0 1.77-1.46L19.5 7.5H6" />
    </svg>
  );
}

function OrderPage({ onBack, onNavigateMenu }) {
  const cart = useCart();
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const summaryRef = useRef(null);
  const rowRefs = useRef({});
  const [placed, setPlaced] = useState(false);

  const items = (cart?.order || [])
    .map((entry) => {
      const item = getMenuItemById(entry.id);
      return item ? { ...item, qty: entry.qty } : null;
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + priceToNumber(item.price) * item.qty, 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", delay: 0.15 }
        );
      }
      if (summaryRef.current) {
        gsap.fromTo(
          summaryRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.3 }
        );
      }
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = (id) => {
    const el = rowRefs.current[id];
    if (!el) {
      cart.removeFromOrder(id);
      return;
    }
    gsap.to(el, {
      opacity: 0,
      x: -24,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => cart.removeFromOrder(id),
    });
  };

  const handlePlaceOrder = () => {
    setPlaced(true);
    window.setTimeout(() => {
      cart.clearOrder();
      setPlaced(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B2D42] pt-24 pb-20 px-4 md:px-6 lg:px-20">
      <div
        ref={headerRef}
        className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 border-b border-[#2B2D42]/10 pb-8"
      >
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#E76F51] hover:text-[#E76F51] text-xs uppercase tracking-widest font-semibold mb-3 transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
          <h1 className="brand-font text-3xl md:text-5xl font-bold text-[#2B2D42]">
            Your Order
          </h1>
        </div>
        {items.length > 0 && (
          <span className="text-xs uppercase tracking-widest text-[#2B2D42]/50">
            {items.reduce((n, i) => n + i.qty, 0)} {items.reduce((n, i) => n + i.qty, 0) === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {placed ? (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <div className="w-16 h-16 rounded-full bg-[#F4A261]/10 border border-[#F4A261]/30 flex items-center justify-center mb-6 text-[#E76F51]">
            <span className="w-7 h-7">
              <CartIcon />
            </span>
          </div>
          <h2 className="brand-font text-xl md:text-2xl font-bold text-[#2B2D42] mb-3">
            Order Placed
          </h2>
          <p className="text-[#2B2D42]/50 text-sm max-w-sm">
            Thanks! An EMBER host will have this fired up shortly.
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <div className="w-16 h-16 rounded-full bg-[#2B2D42]/[0.04] border border-[#2B2D42]/10 flex items-center justify-center mb-6 text-[#E76F51]/60">
            <span className="w-7 h-7">
              <CartIcon />
            </span>
          </div>
          <h2 className="brand-font text-xl md:text-2xl font-bold text-[#2B2D42] mb-3">
            Your order is empty
          </h2>
          <p className="text-[#2B2D42]/50 text-sm max-w-sm mb-8">
            Tap the cart icon on any menu item to add it to your order.
          </p>
          <button
            onClick={onNavigateMenu}
            className="px-8 py-3 bg-[#F4A261] hover:bg-[#E76F51] text-[#2B2D42] rounded-full text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          <div ref={listRef} className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                ref={(el) => (rowRefs.current[item.id] = el)}
                className="flex items-center gap-3 sm:gap-4 rounded-xl border border-[#2B2D42]/10 bg-[#FFF3E6] p-3 sm:p-4 overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="brand-font text-sm sm:text-base font-bold text-[#2B2D42] truncate">
                    {item.name}
                  </h3>
                  <p className="text-[#E76F51] text-xs sm:text-sm font-semibold whitespace-nowrap">{item.price}</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="flex items-center border border-[#2B2D42]/10 rounded-lg overflow-hidden">
                    <button
                      onClick={() => cart.updateOrderQty(item.id, item.qty - 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#2B2D42]/60 hover:text-[#E76F51] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-semibold">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => cart.updateOrderQty(item.id, item.qty + 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#2B2D42]/60 hover:text-[#E76F51] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                    className="text-[#2B2D42]/40 hover:text-red-400 transition-colors cursor-pointer text-lg leading-none"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={summaryRef}
            className="rounded-2xl border border-[#F4A261]/20 bg-gradient-to-b from-[#FFFDF9]/[0.04] to-transparent p-6 sticky top-28"
          >
            <h3 className="brand-font text-lg font-bold text-[#2B2D42] mb-4">Order Summary</h3>
            <div className="flex items-center justify-between text-sm text-[#2B2D42]/60 mb-2">
              <span>Subtotal</span>
              <span>AED {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#2B2D42]/50 mb-4">
              <span>Taxes &amp; fees</span>
              <span>Calculated at pickup</span>
            </div>
            <div className="flex items-center justify-between text-base font-bold text-[#2B2D42] border-t border-[#2B2D42]/10 pt-4 mb-6">
              <span>Total</span>
              <span className="text-[#E76F51]">AED {subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-gradient-to-r from-[#E76F51] to-[#D95F41] hover:from-[#F4A261] hover:to-[#E76F51] text-[#FFFDF9] rounded-full font-semibold tracking-wide uppercase text-sm transition-all shadow-[0_0_20px_rgba(231,111,81,0.3)] hover:shadow-[0_0_30px_rgba(231,111,81,0.5)] cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
