import { useState, useEffect } from "react";
import { ALL_MENU_ITEMS } from "../data/menuItems";
import CardActions from "./CardActions";
import { useLenis } from "../lib/LenisContext";
import FoodDoodles from "./FoodDoodles";

const ITEMS_PER_PAGE = 8;

const CATEGORIES = [
  { id: "all", name: "All Items" },
  { id: "burgers", name: "Burgers" },
  { id: "sides", name: "Sides & Salads" },
  { id: "drinks", name: "Shakes & Drinks" },
  { id: "desserts", name: "Desserts" },
];

function MenuPage({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileActiveId, setMobileActiveId] = useState(null);

  // Trigger loading & shimmer effect when page opens, or when category/page changes
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [currentPage, activeCategory]);

  const filteredItems =
    activeCategory === "all"
      ? ALL_MENU_ITEMS
      : ALL_MENU_ITEMS.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const lenis = useLenis();
  const scrollToTop = () => {
    lenis?.scrollTo(0, { offset: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
    setMobileActiveId(null);
  };

  return (
    <div className="relative isolate overflow-hidden min-h-screen bg-[#FFFDF9] text-[#2B2D42] pt-20 sm:pt-24 pb-24 sm:pb-20 px-4 md:px-6 lg:px-20">
      <FoodDoodles set="menu" />
      {/* Top Header & Navigation */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mb-8 md:mb-12 border-b border-[#2B2D42]/10 pb-6 md:pb-8">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#E76F51] hover:text-[#E76F51] text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
          <div className="flex items-center gap-3 sm:gap-4">
            <h1 className="brand-font text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2D42]">
              Full Craft Menu
            </h1>
            {isLoading && (
              <span className="px-3 py-1 rounded-full bg-[#F4A261]/10 border border-[#F4A261]/30 text-[#E76F51] text-[10px] uppercase tracking-widest font-semibold animate-pulse">
                Loading Menu...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex items-center justify-start md:justify-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${activeCategory === cat.id
                ? "bg-[#E76F51] text-[#FFFDF9] shadow-[0_0_20px_rgba(231,111,81,0.4)]"
                : "bg-[#2B2D42]/[0.04] text-[#2B2D42]/60 border border-[#2B2D42]/10 hover:border-[#F4A261]/40 hover:text-[#E76F51]"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Shimmer Skeleton Loader Grid during Loading */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="relative h-[285px] sm:h-[420px] rounded-xl sm:rounded-2xl border border-[#2B2D42]/10 bg-[#FFF3E6] overflow-hidden flex flex-col justify-between shadow-lg shimmer-box"
            >
              {/* Top half image placeholder */}
              <div className="w-full h-1/2 bg-[#2B2D42]/[0.03] relative flex items-center justify-center">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#2B2D42]/5 animate-pulse flex items-center justify-center">
                  <span className="brand-font text-[#E76F51]/40 text-[10px] sm:text-xs font-bold">EMBER</span>
                </div>
              </div>

              {/* Bottom half text placeholders */}
              <div className="p-3 sm:p-6 flex flex-col justify-between h-1/2 bg-[#FFF3E6]">
                <div className="flex items-center justify-between gap-2">
                  <div className="h-4 sm:h-5 w-24 sm:w-36 bg-[#2B2D42]/10 rounded-md animate-pulse" />
                  <div className="h-4 sm:h-5 w-8 sm:w-12 bg-[#F4A261]/20 rounded-md animate-pulse" />
                </div>

                <div className="space-y-2 mt-2 sm:mt-4">
                  <div className="h-2 sm:h-2.5 w-12 sm:w-16 bg-[#F4A261]/30 rounded-md animate-pulse mb-1.5" />
                  <div className="h-2.5 sm:h-3 w-full bg-[#2B2D42]/5 rounded-md animate-pulse" />
                  <div className="h-2.5 sm:h-3 w-4/5 bg-[#2B2D42]/5 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Product Cards Grid - Loaded Content */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16 transition-opacity duration-500">
          {currentItems.map((item) => (
            <div
              key={item.id}
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
                    <span className="text-[9px] uppercase tracking-wider text-[#F4A261]/90 font-semibold sm:hidden">
                      Details ↓
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Panel: Details text panel shown on mobile tap or desktop hover */}
              <div
                className={`absolute bottom-0 inset-x-0 h-1/2 bg-[#FFF3E6] p-3 sm:p-6 flex flex-col justify-between border-t border-[#F4A261]/20 transform transition-all duration-500 ease-out z-20 ${mobileActiveId === item.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
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
                  <p className="text-[#2B2D42]/80 text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); scrollToTop(); }}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-[#2B2D42]/10 text-xs font-semibold uppercase tracking-wider text-[#2B2D42]/60 hover:text-[#2B2D42] hover:border-[#F4A261]/40 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              onClick={() => { setCurrentPage(page); scrollToTop(); }}
              className={`w-9 h-9 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${currentPage === page
                  ? "bg-[#E76F51] text-[#FFFDF9] font-bold"
                  : "bg-[#2B2D42]/[0.03] text-[#2B2D42]/60 border border-[#2B2D42]/10 hover:border-[#F4A261]/40 hover:text-[#2B2D42]"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); scrollToTop(); }}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-[#2B2D42]/10 text-xs font-semibold uppercase tracking-wider text-[#2B2D42]/60 hover:text-[#2B2D42] hover:border-[#F4A261]/40 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
