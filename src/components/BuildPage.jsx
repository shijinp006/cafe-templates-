import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { useCart } from "../lib/CartContext";
import { PRODUCTS } from "../data/buildData";
import BuildGraphic from "./BuildGraphics";
import { PREVIEWS } from "./BuildPreviews";

const fmt = (n) => `AED ${Number.isInteger(n) ? n : n.toFixed(2)}`;

const TAB_ICON = {
  burger: "brioche",
  pizza: "sz-m",
  salad: "romaine",
};

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BuildPage({ onBack, onViewOrder }) {
  const cart = useCart();
  const [productId, setProductId] = useState("burger");
  const [selections, setSelections] = useState(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, p.initial]))
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === productId);
  const selected = selections[productId];
  const Preview = PREVIEWS[productId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const ctx = gsap.context(() => {
      gsap.from("[data-build-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const chosen = useMemo(() => {
    const list = [];
    product.steps.forEach((step) => {
      const ids = step.mode === "single" ? [selected[step.id]] : selected[step.id];
      ids.forEach((id) => {
        const opt = step.options.find((o) => o.id === id);
        if (opt) list.push({ ...opt, step: step.id });
      });
    });
    return list;
  }, [product, selected]);

  const unitPrice = chosen.reduce((sum, o) => sum + o.price, 0);
  const total = unitPrice * qty;

  const setSelected = (next) => setSelections((prev) => ({ ...prev, [productId]: next }));

  const pick = (step, id) => {
    setAdded(false);
    if (step.mode === "single") {
      setSelected({ ...selected, [step.id]: id });
      return;
    }
    const has = selected[step.id].includes(id);
    setSelected({
      ...selected,
      [step.id]: has ? selected[step.id].filter((x) => x !== id) : [...selected[step.id], id],
    });
  };

  const reset = () => {
    setSelected(product.initial);
    setQty(1);
    setAdded(false);
  };

  const switchProduct = (id) => {
    if (id === productId) return;
    setProductId(id);
    setQty(1);
    setAdded(false);
  };

  const handleAdd = () => {
    const names = chosen.map((o) => o.label).join(", ");
    cart?.addCustomToOrder(
      {
        name: product.title,
        price: fmt(unitPrice),
        description: names,
        ingredients: names,
      },
      qty
    );
    setAdded(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B2D42] pt-20 sm:pt-24 pb-28 sm:pb-20 px-4 md:px-6 lg:px-20">
      <div
        data-build-reveal
        className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4 mb-6 sm:mb-8"
      >
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#E76F51] text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3 transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
          <h1 className="brand-font text-3xl sm:text-4xl md:text-5xl font-bold">Build Your Own</h1>
          <p className="text-[#2B2D42]/60 text-sm mt-2 max-w-md">{product.blurb}</p>
        </div>
        <button
          onClick={reset}
          className="self-start sm:self-auto text-xs uppercase tracking-widest font-semibold text-[#2B2D42]/60 hover:text-[#E76F51] transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Product picker */}
      <div data-build-reveal className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md sm:max-w-lg mb-8 sm:mb-12">
        {PRODUCTS.map((p) => {
          const on = p.id === productId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => switchProduct(p.id)}
              aria-pressed={on}
              className={`min-w-0 rounded-xl border px-2 py-3 flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer active:scale-95 ${
                on
                  ? "border-[#E76F51] bg-[#FFF3E6] shadow-[0_6px_18px_rgba(231,111,81,0.22)]"
                  : "border-[#2B2D42]/10 bg-white hover:border-[#F4A261]"
              }`}
            >
              <BuildGraphic id={TAB_ICON[p.id]} color={p.id === "burger" ? "#F5B85C" : p.id === "pizza" ? "#E2A85F" : "#8DB52F"} className="w-14 h-10 sm:w-20 sm:h-14" />
              <span className={`brand-font text-sm sm:text-base font-bold ${on ? "text-[#E76F51]" : ""}`}>{p.label}</span>
            </button>
          );
        })}
      </div>

      <div key={productId} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start w-full">
        {/* Options */}
        <div
          data-lenis-prevent
          className="min-w-0 lg:col-span-3 space-y-8 lg:max-h-[calc(100vh-210px)] lg:overflow-y-auto lg:pr-3 custom-scrollbar pb-6"
        >
          {product.steps.map((step, i) => (
            <section key={step.id}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-[#E76F51] text-[#FFFDF9] text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <h2 className="brand-font text-lg font-bold">{step.title}</h2>
                <span className="text-[10px] uppercase tracking-widest text-[#2B2D42]/40">
                  {step.mode === "single" ? "Choose 1" : "Optional"}
                </span>
              </div>
              <div
                className={`grid gap-2 sm:gap-3 ${
                  step.options.length % 4 === 0 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"
                }`}
              >
                {step.options.map((opt) => {
                  const on =
                    step.mode === "single"
                      ? selected[step.id] === opt.id
                      : selected[step.id].includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => pick(step, opt.id)}
                      aria-pressed={on}
                      className={`group relative min-w-0 overflow-hidden text-left rounded-xl border transition-all duration-300 cursor-pointer active:scale-95 ${
                        on
                          ? "border-[#E76F51] bg-[#FFF3E6] shadow-[0_6px_18px_rgba(231,111,81,0.22)]"
                          : "border-[#2B2D42]/10 bg-white hover:border-[#F4A261] hover:-translate-y-0.5"
                      }`}
                    >
                      <span className="flex h-24 sm:h-28 w-full items-center justify-center bg-[#FFF3E6] p-3 overflow-hidden">
                        <BuildGraphic
                          id={opt.id}
                          color={opt.color}
                          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      </span>
                      <span className="block px-3 pt-2.5 pb-3">
                        <span className="block text-sm font-semibold truncate">{opt.label}</span>
                        <span className="block text-xs text-[#E76F51] font-semibold mt-0.5">
                          {opt.price ? `+${fmt(opt.price)}` : "Included"}
                        </span>
                      </span>
                      {on && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#E76F51] text-[#FFFDF9] flex items-center justify-center">
                          <Check />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Preview + summary */}
        <aside className="min-w-0 lg:col-span-2 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl border border-[#2B2D42]/10 bg-[#FFF3E6] px-4 py-3.5 sm:py-4 flex flex-col items-center">
            <Preview product={product} selected={selected} />
          </div>

          <div className="rounded-2xl border border-[#F4A261]/30 bg-white p-4 sm:p-5">
            <h3 className="brand-font text-lg font-bold mb-3">Your ingredients</h3>
            <ul className="space-y-1.5 text-sm mb-4">
              {chosen.map((o) => (
                <li key={`${o.step}-${o.id}`} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 border border-[#2B2D42]/10" style={{ background: o.color }} />
                    <span className="truncate text-[#2B2D42]/80">{o.label}</span>
                  </span>
                  <span className="text-[#2B2D42]/60 whitespace-nowrap">{o.price ? fmt(o.price) : "Included"}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-[#2B2D42]/10 pt-4 mb-4">
              <span className="text-sm text-[#2B2D42]/60">Price each</span>
              <span className="font-semibold">{fmt(unitPrice)}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#2B2D42]/60">Quantity</span>
              <div className="flex items-center border border-[#2B2D42]/15 rounded-lg overflow-hidden bg-[#FFFDF9]">
                <button
                  type="button"
                  onClick={() => { setQty((q) => Math.max(1, q - 1)); setAdded(false); }}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 flex items-center justify-center text-[#2B2D42]/60 hover:text-[#E76F51] cursor-pointer"
                >
                  −
                </button>
                <span className="w-9 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  onClick={() => { setQty((q) => Math.min(20, q + 1)); setAdded(false); }}
                  aria-label="Increase quantity"
                  className="w-9 h-9 flex items-center justify-center text-[#2B2D42]/60 hover:text-[#E76F51] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-base font-bold border-t border-[#2B2D42]/10 pt-4 mb-5">
              <span>Total</span>
              <span className="text-[#E76F51] text-xl">{fmt(total)}</span>
            </div>

            {added ? (
              <div className="space-y-3">
                <p className="text-center text-sm text-[#2B2D42]/70">Added to your order ✓</p>
                <button
                  onClick={onViewOrder}
                  className="w-full py-3 bg-gradient-to-r from-[#E76F51] to-[#D95F41] text-[#FFFDF9] rounded-lg font-semibold tracking-wide uppercase text-sm cursor-pointer"
                >
                  View Order
                </button>
                <button
                  onClick={reset}
                  className="w-full py-3 border border-[#2B2D42]/15 text-[#2B2D42]/70 hover:border-[#E76F51] hover:text-[#E76F51] rounded-lg font-semibold tracking-wide uppercase text-sm transition-colors cursor-pointer"
                >
                  Build Another
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-gradient-to-r from-[#E76F51] to-[#D95F41] hover:from-[#F4A261] hover:to-[#E76F51] text-[#FFFDF9] rounded-lg font-semibold tracking-wide uppercase text-sm transition-all shadow-[0_0_20px_rgba(231,111,81,0.3)] cursor-pointer"
              >
                Add to Order · {fmt(total)}
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BuildPage;
