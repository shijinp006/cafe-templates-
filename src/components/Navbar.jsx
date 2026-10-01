import { useEffect, useState } from "react";
import { useLenis } from "../lib/LenisContext";
import { useCart } from "../lib/CartContext";

const LINKS = [
  { id: "products", label: "Menu" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4 6 4c2.1 0 3.6 1.1 4.5 2.4C11.4 5.1 12.9 4 15 4c3.7 0 5.5 3.8 4 7.2-2.5 4.7-10 9.3-10 9.3z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <path d="M2.5 3h2l2.2 11.2a1.8 1.8 0 0 0 1.78 1.5h7.6a1.8 1.8 0 0 0 1.77-1.46L19.5 7.5H6" />
    </svg>
  );
}

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#F4A261] text-[#2B2D42] text-[9px] font-bold flex items-center justify-center">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function Navbar({ onNavigateSection, onNavigateWishlist, onNavigateOrder }) {
  const lenis = useLenis();
  const cart = useCart();
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const checkHero = () => {
      const hero = document.getElementById("hero");
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 80);
    };
    checkHero();
    const onScroll = () => {
      checkHero();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNav = (id) => (e) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(id, lenis);
    }
  };

  const handleWishlist = () => {
    onNavigateWishlist?.();
  };

  const handleOrder = () => {
    onNavigateOrder?.();
  };

  return (
    <>
      <header className={`nav-drop fixed top-0 w-full z-50 px-4 md:px-6 lg:px-20 py-5 flex justify-between items-center transition-colors duration-300 ${
        overHero
          ? "bg-transparent"
          : "bg-gradient-to-r from-[#FFF3E6] via-[#FFE9EC] to-[#FFF3E6]"
      }`}>
        <a
          href="#hero"
          onClick={handleNav("hero")}
          style={{ animationDelay: "0.2s" }}
          className={`nav-item brand-font text-xl md:text-2xl tracking-widest font-bold transition-colors ${overHero ? "text-[#F4A261] hover:text-[#F8B583]" : "text-[#E76F51] hover:text-[#F4A261]"}`}
        >
          EMBER
        </a>

        <nav className={`hidden sm:flex items-center gap-8 text-sm tracking-[0.2em] uppercase ${overHero ? "text-[#FFFDF9]/60" : "text-[#2B2D42]/60"}`}>
          {LINKS.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleNav(link.id)}
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              className="nav-item nav-link hover:text-[#E76F51] transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={handleWishlist}
            aria-label="View wishlist"
            style={{ animationDelay: "0.7s" }}
            className={`nav-item relative w-6 h-6 sm:w-5 sm:h-5 hover:text-[#E76F51] hover:scale-110 transition-all cursor-pointer ${overHero ? "text-[#FFFDF9]/80" : "text-[#2B2D42]/80"}`}
          >
            <HeartIcon />
            <CountBadge count={cart?.wishlistCount} />
          </button>
          <button
            type="button"
            onClick={handleOrder}
            aria-label="View order"
            style={{ animationDelay: "0.8s" }}
            className={`nav-item relative w-6 h-6 sm:w-5 sm:h-5 hover:text-[#E76F51] hover:scale-110 transition-all cursor-pointer ${overHero ? "text-[#FFFDF9]/80" : "text-[#2B2D42]/80"}`}
          >
            <CartIcon />
            <CountBadge count={cart?.orderCount} />
          </button>

        </div>
      </header>

    </>
  );
}

export default Navbar;
