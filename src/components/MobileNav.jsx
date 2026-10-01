import { useEffect, useRef, useState } from "react";
import { useLenis } from "../lib/LenisContext";

const MOBILE_LINKS = [
  { id: "hero", label: "Home", icon: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" },
  { id: "products", label: "Menu", icon: "M7 3v8M5 3v5a2 2 0 004 0V3M7 11v10M17 3c-2 1.5-3 4-3 7h3v11M17 3v7" },
  { id: "about", label: "About", icon: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 11v6M12 7.5v.01" },
  { id: "contact", label: "Contact", icon: "M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" },
];

const HIDE_DELAY_MS = 2000;

function MobileNav({ onNavigateSection }) {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const handleNav = (id) => (e) => {
    e.preventDefault();
    onNavigateSection?.(id, lenis);
  };

  return (
    <nav
      aria-label="Primary"
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FFF3E6] border-t border-[#2B2D42]/10 flex justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {MOBILE_LINKS.map((link, i) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={handleNav(link.id)}
          style={{ transitionDelay: visible ? `${i * 70}ms` : "0ms" }}
          className={`flex flex-col items-center gap-1 px-3 py-1 text-[#2B2D42]/60 hover:text-[#E76F51] active:scale-90 transition-[transform,opacity,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d={link.icon} />
          </svg>
          <span className="text-[10px] font-semibold tracking-widest uppercase">{link.label}</span>
        </a>
      ))}
    </nav>
  );
}

export default MobileNav;
