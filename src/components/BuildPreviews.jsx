import { Piece } from "./BuildPieces";

const SESAME_DOTS = [
  [18, 30], [34, 18], [50, 28], [66, 16], [82, 30],
  [26, 46], [58, 44], [74, 46],
];

const optionOf = (product, stepId, id) =>
  product.steps.find((s) => s.id === stepId).options.find((o) => o.id === id);

const layersOf = (product, selected, stepId) =>
  selected[stepId].map((id) => optionOf(product, stepId, id));

// Evenly scattered points inside a circle (golden-angle spiral).
function spiral(count, radius, cx = 100, cy = 100) {
  return Array.from({ length: count }, (_, j) => {
    const r = radius * Math.sqrt((j + 0.5) / count);
    const a = j * 2.39996;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a), (j * 47) % 360];
  });
}

export function BurgerPreview({ product, selected }) {
  const bun = optionOf(product, "bun", selected.bun);
  const patty = optionOf(product, "patty", selected.patty);

  return (
    <div className="w-44 sm:w-48 flex flex-col items-stretch">
      <div className="relative h-14 rounded-t-[999px] rounded-b-md" style={{ background: bun.color }}>
        <div className="absolute inset-0 rounded-t-[999px] bg-gradient-to-br from-white/25 via-transparent to-black/10" />
        {selected.bun !== "charcoal" &&
          SESAME_DOTS.map(([x, y]) => (
            <span
              key={`${x}-${y}`}
              className="absolute w-1.5 h-2.5 rounded-full bg-[#FFE3A8]/80"
              style={{ left: `${x}%`, top: `${y}%`, transform: `rotate(${x * 2}deg)` }}
            />
          ))}
      </div>

      {layersOf(product, selected, "extras").map((o) => (
        <div key={o.id} className="build-layer h-3 rounded-md -mx-1" style={{ background: o.color }} />
      ))}
      {layersOf(product, selected, "sauces").map((o) => (
        <div key={o.id} className="build-layer h-1 rounded-full mx-2" style={{ background: o.color }} />
      ))}
      {layersOf(product, selected, "veggies").map((o, i) => (
        <div
          key={o.id}
          className="build-layer h-2.5 rounded-full"
          style={{ background: o.color, marginLeft: i % 2 ? -4 : -1, marginRight: i % 2 ? -1 : -4 }}
        />
      ))}
      {layersOf(product, selected, "cheese").map((o) => (
        <div key={o.id} className="build-layer h-2 rounded-sm -mx-1.5" style={{ background: o.color }} />
      ))}
      {Array.from({ length: patty.count || 1 }).map((_, i) => (
        <div key={`${patty.id}-${i}`} className="build-layer h-6 rounded-xl -mx-1" style={{ background: patty.color }} />
      ))}

      <div className="h-7 rounded-t-md rounded-b-3xl" style={{ background: bun.color }}>
        <div className="h-full rounded-t-md rounded-b-3xl bg-gradient-to-b from-black/5 to-black/15" />
      </div>
      <div className="h-1.5 rounded-full bg-black/10 blur-[2px] mx-4 mt-1.5" />
    </div>
  );
}

const SIZE_SCALE = { "sz-s": 0.72, "sz-m": 0.86, "sz-l": 1 };
const CRUST_RIM = { thin: 5, thick: 13, stuffed: 17 };

export function PizzaPreview({ product, selected }) {
  const crust = optionOf(product, "crust", selected.crust);
  const sauce = optionOf(product, "sauce", selected.sauce);
  const toppingOpts = product.steps.find((s) => s.id === "toppings").options;
  const R = 94 * (SIZE_SCALE[selected.size] || 0.86);
  const rim = CRUST_RIM[selected.crust] || 12;
  const inner = R - rim;
  const spots = spiral(54, inner - 12);
  const cheeses = layersOf(product, selected, "cheese");

  return (
    <svg viewBox="0 0 200 200" className="w-44 sm:w-52 h-auto transition-all duration-500" role="img" aria-label="Your pizza">
      <ellipse cx="100" cy="190" rx={R * 0.8} ry="5" fill="#000" opacity="0.12" />
      <circle cx="100" cy="100" r={R} fill={crust.color} className="transition-all duration-500" />
      <circle cx="100" cy="100" r={R} fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="2" />
      {selected.crust === "stuffed" &&
        Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={100 + Math.cos(a) * (R - rim / 2)}
              cy={100 + Math.sin(a) * (R - rim / 2)}
              r="2"
              fill="#FFF3C4"
              opacity="0.8"
            />
          );
        })}
      <circle cx="100" cy="100" r={inner} fill={sauce.color} className="transition-all duration-500" />
      {cheeses.map((c, i) => (
        <circle
          key={c.id}
          cx="100"
          cy="100"
          r={inner - 3 - i * 2}
          fill={c.color}
          opacity="0.85"
          className="build-pop"
        />
      ))}
      {selected.toppings.map((id) => {
        const idx = toppingOpts.findIndex((o) => o.id === id);
        return (
          <g key={id} className="build-pop">
            {spots
              .filter((_, j) => j % toppingOpts.length === idx)
              .map(([x, y, r], k) => (
                <Piece key={k} id={id} x={x} y={y} r={r} s={0.95} />
              ))}
          </g>
        );
      })}
    </svg>
  );
}

export function SaladPreview({ product, selected }) {
  const base = optionOf(product, "base", selected.base);
  const dressing = optionOf(product, "dressing", selected.dressing);
  const toppingOpts = product.steps.find((s) => s.id === "toppings").options;
  const leafSpots = spiral(14, 62);
  const toppingSpots = spiral(30, 66);
  const proteinSpots = [[100, 96, 0], [84, 112, 30], [116, 112, -30], [100, 126, 10], [86, 84, -20], [114, 84, 20]];

  return (
    <svg viewBox="0 0 200 200" className="w-44 sm:w-52 h-auto" role="img" aria-label="Your salad bowl">
      <ellipse cx="100" cy="190" rx="76" ry="5" fill="#000" opacity="0.12" />
      <circle cx="100" cy="100" r="94" fill="#F3E7D8" stroke="#E2D2BC" strokeWidth="3" />
      <circle cx="100" cy="100" r="82" fill="#FFFDF9" />
      <circle cx="100" cy="100" r="76" fill={base.color} className="transition-colors duration-500" />
      {leafSpots.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="18" ry="9" fill="#fff" opacity="0.15" transform={`rotate(${r} ${x} ${y})`} />
      ))}

      {selected.protein && (
        <g key={selected.protein} className="build-pop">
          {proteinSpots.map(([x, y, r], i) => (
            <Piece key={i} id={selected.protein} x={x} y={y} r={r} s={1.15} />
          ))}
        </g>
      )}

      {selected.toppings.map((id) => {
        const idx = toppingOpts.findIndex((o) => o.id === id);
        return (
          <g key={id} className="build-pop">
            {toppingSpots
              .filter((_, j) => j % toppingOpts.length === idx)
              .map(([x, y, r], k) => (
                <Piece key={k} id={id} x={x} y={y} r={r} s={1.1} />
              ))}
          </g>
        );
      })}

      <g key={dressing.id} className="build-pop" fill="none" stroke={dressing.color} strokeWidth="3" strokeLinecap="round" opacity="0.9">
        <path d="M46 70q14 -10 28 0t28 0 28 0 28 0" />
        <path d="M54 130q12 -8 24 0t24 0 24 0" />
      </g>
    </svg>
  );
}

export const PREVIEWS = {
  burger: BurgerPreview,
  pizza: PizzaPreview,
  salad: SaladPreview,
};
