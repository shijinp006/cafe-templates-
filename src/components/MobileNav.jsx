import { useState, useEffect } from "react";
import { useLenis } from "../lib/LenisContext";
import { useCart } from "../lib/CartContext";

function MobileNav({ onNavigateSection, onNavigateWishlist, onNavigateOrder }) {
  const lenis = useLenis();
  const cart = useCart();
  const [currentHash, setCurrentHash] = useState(window.location.hash || "#hero");

  useEffect(() => {
    const handleHash = () => setCurrentHash(window.location.hash || "#hero");
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleNav = (id) => (e) => {
    e.preventDefault();
    if (id === "wishlist") {
      onNavigateWishlist?.();
    } else if (id === "order") {
      onNavigateOrder?.();
    } else {
      onNavigateSection?.(id, lenis);
    }
  };

  const navItems = [
    {
      id: "hero",
      label: "Home",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" />
        </svg>
      ),
    },
    {
      id: "products",
      label: "Menu",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3v8M5 3v5a2 2 0 004 0V3M7 11v10M17 3c-2 1.5-3 4-3 7h3v11M17 3v7" />
        </svg>
      ),
    },
    {
      id: "wishlist",
      label: "Wishlist",
      badge: cart?.wishlistCount,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4 6 4c2.1 0 3.6 1.1 4.5 2.4C11.4 5.1 12.9 4 15 4c3.7 0 5.5 3.8 4 7.2-2.5 4.7-10 9.3-10 9.3z" />
        </svg>
      ),
    },
    {
      id: "order",
      label: "Order",
      badge: cart?.orderCount,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
          <path d="M2.5 3h2l2.2 11.2a1.8 1.8 0 0 0 1.78 1.5h7.6a1.8 1.8 0 0 0 1.77-1.46L19.5 7.5H6" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FFF3E6]/95 backdrop-blur-md border-t border-[#2B2D42]/10 flex justify-around px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-10px_25px_rgba(43,45,66,0.06)]"
    >
      {navItems.map((item) => {
        const isActive =
          (item.id === "hero" && (currentHash === "" || currentHash === "#hero")) ||
          (item.id === "products" && (currentHash === "#products" || currentHash === "#menu")) ||
          currentHash === `#${item.id}`;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={handleNav(item.id)}
            className={`relative flex flex-col items-center gap-1 px-3 py-1 transition-all duration-200 active:scale-95 cursor-pointer ${
              isActive ? "text-[#E76F51] font-bold" : "text-[#2B2D42]/60 hover:text-[#2B2D42]"
            }`}
          >
            <div className="relative">
              {item.icon}
              {!!item.badge && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full bg-[#F4A261] text-[#2B2D42] text-[9px] font-extrabold flex items-center justify-center leading-none">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wider uppercase font-semibold">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export default MobileNav;
