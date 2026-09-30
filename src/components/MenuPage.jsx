import { useState, useEffect } from "react";

const ALL_MENU_ITEMS = [
  {
    id: "ember-signature",
    name: "Ember Signature",
    price: "$12",
    category: "burgers",
    description: "Aged cheddar, hand-pressed grass-fed beef, toasted brioche, crisp lettuce and vine tomato.",
    image: "/images/about-burger.jpg",
  },
  {
    id: "double-flame",
    name: "Double Flame Smothered",
    price: "$15",
    category: "burgers",
    description: "Double grass-fed beef patty, melted cheddar drip, smoked bacon, signature ember aioli.",
    image: "/images/menu/double-burger.jpg",
  },
  {
    id: "crispy-chicken",
    name: "Crispy Buttermilk Chicken",
    price: "$13",
    category: "burgers",
    description: "Golden buttermilk fried chicken, house spicy coleslaw, kosher dill pickles, toasted brioche.",
    image: "/images/menu/chicken-burger.jpg",
  },
  {
    id: "smoky-bacon-bbq",
    name: "Smoky Bacon BBQ Burger",
    price: "$14",
    category: "burgers",
    description: "Applewood bacon, sharp cheddar, crispy onion straws, hickory barbecue glaze.",
    image: "/frames/frame_0001.webp",
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    price: "$7",
    category: "sides",
    description: "Hand-cut fries, melted cheddar, crispy bacon, smoked chili aioli.",
    image: "/images/menu/loaded-fries.jpg",
  },
  {
    id: "onion-rings",
    name: "Beer-Battered Onion Rings",
    price: "$6",
    category: "sides",
    description: "Crispy beer-battered Vidalia onion rings served with house garlic aioli dipping sauce.",
    image: "/images/menu/onion-rings.jpg",
  },
  {
    id: "ember-salad",
    name: "Ember Salad",
    price: "$9",
    category: "sides",
    description: "Charred romaine, cherry tomato, shaved parmesan, citrus vinaigrette.",
    image: "/images/menu/ember-salad.jpg",
  },
  {
    id: "chili-tots",
    name: "Smoked Chili Cheese Tots",
    price: "$8",
    category: "sides",
    description: "Golden tater tots smothered in house ember chili, melted cheddar, and green onions.",
    image: "/images/menu/loaded-fries.jpg",
  },
  {
    id: "charcoal-shake",
    name: "Charcoal Shake",
    price: "$6",
    category: "drinks",
    description: "Activated-charcoal vanilla shake, whipped cream, toasted marshmallow.",
    image: "/images/menu/charcoal-shake.jpg",
  },
  {
    id: "chocolate-heaven",
    name: "Decadent Chocolate Shake",
    price: "$7",
    category: "drinks",
    description: "Triple fudge chocolate milkshake topped with fresh whipped cream and cocoa drizzle.",
    image: "/images/menu/chocolate-shake.jpg",
  },
  {
    id: "sweet-tea",
    name: "Sweet Tea",
    price: "$4",
    category: "drinks",
    description: "House-brewed black tea, lightly sweetened, served over crushed ice.",
    image: "/images/menu/sweet-tea.jpg",
  },
  {
    id: "craft-ginger-beer",
    name: "Spicy Craft Ginger Beer",
    price: "$5",
    category: "drinks",
    description: "Artisanal spicy ginger beer brewed with fresh ginger root and fresh lime.",
    image: "/images/menu/sweet-tea.jpg",
  },
  {
    id: "molten-cookie",
    name: "Warm Molten Skillet Cookie",
    price: "$8",
    category: "desserts",
    description: "Cast-iron skillet chocolate chip cookie served warm with vanilla bean ice cream and fudge.",
    image: "/images/menu/molten-cookie.jpg",
  },
  {
    id: "marshmallow-slink",
    name: "S'mores Sundae Shake",
    price: "$7",
    category: "desserts",
    description: "Toasted marshmallow vanilla shake layered with graham cracker crumble and dark chocolate.",
    image: "/images/menu/charcoal-shake.jpg",
  },
];

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

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
    setMobileActiveId(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 px-4 md:px-6 lg:px-20">
      {/* Top Header & Navigation */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-xs uppercase tracking-widest font-semibold mb-3 transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
          <div className="flex items-center gap-4">
            <h1 className="brand-font text-3xl md:text-5xl font-bold text-white">
              Full Craft Menu
            </h1>
            {isLoading && (
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] uppercase tracking-widest font-semibold animate-pulse">
                Loading Menu...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${activeCategory === cat.id
                ? "bg-amber-600 text-black shadow-[0_0_20px_rgba(217,119,6,0.4)]"
                : "bg-white/[0.04] text-gray-400 border border-white/10 hover:border-amber-500/40 hover:text-amber-400"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Shimmer Skeleton Loader Grid during Loading */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="relative h-[260px] sm:h-[420px] rounded-xl sm:rounded-2xl border border-white/10 bg-[#121212] overflow-hidden flex flex-col justify-between shadow-lg shimmer-box"
            >
              {/* Top half image placeholder */}
              <div className="w-full h-1/2 bg-white/[0.03] relative flex items-center justify-center">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/5 animate-pulse flex items-center justify-center">
                  <span className="brand-font text-amber-500/40 text-[10px] sm:text-xs font-bold">EMBER</span>
                </div>
              </div>

              {/* Bottom half text placeholders */}
              <div className="p-3 sm:p-6 flex flex-col justify-between h-1/2 bg-[#121212]">
                <div className="flex items-center justify-between gap-2">
                  <div className="h-4 sm:h-5 w-24 sm:w-36 bg-white/10 rounded-md animate-pulse" />
                  <div className="h-4 sm:h-5 w-8 sm:w-12 bg-amber-500/20 rounded-md animate-pulse" />
                </div>

                <div className="space-y-2 mt-2 sm:mt-4">
                  <div className="h-2 sm:h-2.5 w-12 sm:w-16 bg-amber-500/30 rounded-md animate-pulse mb-1.5" />
                  <div className="h-2.5 sm:h-3 w-full bg-white/5 rounded-md animate-pulse" />
                  <div className="h-2.5 sm:h-3 w-4/5 bg-white/5 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Product Cards Grid - Loaded Content */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-16 transition-opacity duration-500">
          {currentItems.map((item) => (
            <div
              key={item.id}
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
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white hover:border-amber-500/40 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${currentPage === page
                  ? "bg-amber-600 text-black font-bold"
                  : "bg-white/[0.03] text-gray-400 border border-white/10 hover:border-amber-500/40 hover:text-white"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white hover:border-amber-500/40 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
