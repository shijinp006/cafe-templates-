// Decorative black line-art food sketches for light page backgrounds.
// Put inside a section that has `relative isolate overflow-hidden`.

const ICONS = {
  burger: (
    <>
      <path d="M10 28c0-10 10-16 22-16s22 6 22 16z" />
      <path d="M22 20l2 1M32 17l2 1M42 20l2 1M28 24l2 1M38 24l2 1" />
      <path d="M8 33c4 3 8-3 12 0s8-3 12 0 8-3 12 0 8-3 12 0" />
      <rect x="10" y="38" width="44" height="6" rx="3" />
      <path d="M10 48h44c0 6-4 8-8 8H18c-4 0-8-2-8-8z" />
    </>
  ),
  fries: (
    <>
      <path d="M18 30h28l-4 26H22z" />
      <path d="M24 30V14M30 30V8M36 30V10M42 30V16" />
      <path d="M22 14l2-4 2 4M28 8l2-4 2 4M34 10l2-4 2 4M40 16l2-4 2 4" />
      <path d="M23 40h18" />
    </>
  ),
  pizza: (
    <>
      <path d="M8 14c16-8 32-8 48 0L32 58z" />
      <path d="M11 20c14-6 28-6 42 0" />
      <circle cx="26" cy="28" r="4" />
      <circle cx="38" cy="27" r="4" />
      <circle cx="32" cy="42" r="3.5" />
    </>
  ),
  shake: (
    <>
      <path d="M18 24h28l-4 32H22z" />
      <path d="M20 24c0-7 5-10 12-10s12 3 12 10" />
      <path d="M34 14l5-10h7" />
      <path d="M22 36h20M23 46h18" />
    </>
  ),
  cup: (
    <>
      <path d="M16 20h32l-4 36H20z" />
      <path d="M14 20h36" />
      <path d="M32 20V6l8-2" />
      <path d="M19 32h26M21 44h22" />
    </>
  ),
  hotdog: (
    <>
      <path d="M6 38c0-9 7-14 14-14h24c7 0 14 5 14 14s-7 14-14 14H20C13 52 6 47 6 38z" />
      <path d="M10 38h44" />
      <path d="M14 35q4-4 8 0t8 0 8 0 8 0 6 0" />
    </>
  ),
  donut: (
    <>
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="7" />
      <path d="M18 22l3 2M42 18l-2 3M48 34l-3 1M24 46l2-3M40 46l-2-3M16 34l3 0" />
    </>
  ),
  icecream: (
    <>
      <path d="M22 28h20L32 60z" />
      <path d="M26 36l6 12M36 36l-6 12" />
      <path d="M20 28c-4-2-4-10 2-12 0-6 6-10 12-8 6-2 12 4 10 10 4 2 4 8-2 10" />
    </>
  ),
};

// Sketches sit in the four corners, partly cropped by the section edge.
const SETS = {
  products: [
    { icon: "burger", cls: "top-4 md:top-6 left-1 md:left-3 w-10 md:w-16 rotate-[18deg]" },
    { icon: "fries", cls: "top-4 md:top-6 right-1 md:right-3 w-10 md:w-16 -rotate-[18deg]" },
    { icon: "shake", cls: "bottom-4 md:bottom-6 left-1 md:left-3 w-10 md:w-16 -rotate-[14deg]" },
    { icon: "pizza", cls: "bottom-4 md:bottom-6 right-1 md:right-3 w-10 md:w-16 rotate-[14deg]" },
  ],
  about: [
    { icon: "hotdog", cls: "top-4 md:top-6 left-1 md:left-3 w-10 md:w-16 rotate-[18deg]" },
    { icon: "icecream", cls: "top-4 md:top-6 right-1 md:right-3 w-10 md:w-16 -rotate-[18deg]" },
    { icon: "cup", cls: "bottom-4 md:bottom-6 left-1 md:left-3 w-10 md:w-16 -rotate-[14deg]" },
    { icon: "donut", cls: "bottom-4 md:bottom-6 right-1 md:right-3 w-10 md:w-16 rotate-[14deg]" },
  ],
  contact: [
    { icon: "pizza", cls: "top-4 md:top-6 left-1 md:left-3 w-10 md:w-16 rotate-[18deg]" },
    { icon: "burger", cls: "top-4 md:top-6 right-1 md:right-3 w-10 md:w-16 -rotate-[18deg]" },
    { icon: "donut", cls: "bottom-4 md:bottom-6 left-1 md:left-3 w-10 md:w-16 -rotate-[14deg]" },
    { icon: "shake", cls: "bottom-4 md:bottom-6 right-1 md:right-3 w-10 md:w-16 rotate-[14deg]" },
  ],
  menu: [
    { icon: "burger", cls: "top-[88px] left-1 md:left-3 w-10 md:w-16 rotate-[18deg]" },
    { icon: "pizza", cls: "top-[88px] right-1 md:right-3 w-10 md:w-16 -rotate-[18deg]" },
    { icon: "shake", cls: "bottom-4 md:bottom-6 left-1 md:left-3 w-10 md:w-16 -rotate-[14deg]" },
    { icon: "fries", cls: "bottom-4 md:bottom-6 right-1 md:right-3 w-10 md:w-16 rotate-[14deg]" },
  ],
};

function FoodDoodles({ set = "products" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {(SETS[set] || SETS.products).map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 64 64"
          className={`absolute text-[#2B2D42] opacity-[0.35] ${d.cls}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ "--d": `${(i * 0.3).toFixed(1)}s` }}
        >
          <g className="doodle-float">
            <g className="doodle-art">{ICONS[d.icon]}</g>
          </g>
        </svg>
      ))}
    </div>
  );
}

export default FoodDoodles;
