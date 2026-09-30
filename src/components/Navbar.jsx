import { useState } from "react";
import { useLenis } from "../lib/LenisContext";

const LINKS = [
  { id: "products", label: "Menu" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function Navbar({ onNavigateSection }) {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id, lenis);
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 px-4 md:px-6 lg:px-20 py-5 flex justify-between items-center bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent backdrop-blur-sm">
        <a
          href="#hero"
          onClick={handleNav("hero")}
          className="brand-font text-xl md:text-2xl tracking-widest text-amber-500 font-bold hover:text-amber-400 transition-colors"
        >
          EMBER
        </a>

        <nav className="hidden sm:flex items-center gap-8 text-sm tracking-[0.2em] uppercase text-gray-400">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleNav(link.id)}
              className="hover:text-amber-500 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="sm:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
        >
          <span
            className={`block h-[2px] w-6 bg-amber-500 transition-all duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-amber-500 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-amber-500 transition-all duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      {/* Rendered outside <header> because its backdrop-blur creates a
          containing block for position:fixed descendants, which would
          shrink this overlay down to the header's own height. */}
      <div
        className={`sm:hidden fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={handleNav(link.id)}
            className="brand-font text-2xl tracking-widest uppercase text-gray-300 hover:text-amber-500 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

export default Navbar;
