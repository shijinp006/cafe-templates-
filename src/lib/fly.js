import { gsap } from "gsap";

const HEART_SVG =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="#2B2D42" stroke="#2B2D42" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4 6 4c2.1 0 3.6 1.1 4.5 2.4C11.4 5.1 12.9 4 15 4c3.7 0 5.5 3.8 4 7.2-2.5 4.7-10 9.3-10 9.3z"/></svg>';
const CART_SVG =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2B2D42" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.3" fill="#2B2D42" stroke="none"/><circle cx="17" cy="20" r="1.3" fill="#2B2D42" stroke="none"/><path d="M2.5 3h2l2.2 11.2a1.8 1.8 0 0 0 1.78 1.5h7.6a1.8 1.8 0 0 0 1.77-1.46L19.5 7.5H6"/></svg>';

// First matching target that is on screen (e.g. the navbar icon).
function findTarget(kind) {
  const nodes = document.querySelectorAll(`[data-fly-target="${kind}"]`);
  for (const el of nodes) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight) return el;
  }
  return null;
}

/**
 * Fly a small token from `fromEl` to the wishlist/order icon.
 * kind: "wishlist" | "order"; image: optional photo for the token.
 */
export function flyToCart(fromEl, kind, image) {
  if (!fromEl || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = findTarget(kind);
  if (!target) return;

  const from = fromEl.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const size = 44;
  const startX = from.left + from.width / 2 - size / 2;
  const startY = from.top + from.height / 2 - size / 2;
  const dx = to.left + to.width / 2 - size / 2 - startX;
  const dy = to.top + to.height / 2 - size / 2 - startY;

  const token = document.createElement("div");
  token.setAttribute("aria-hidden", "true");
  Object.assign(token.style, {
    position: "fixed",
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    zIndex: "200",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F4A261",
    border: "2px solid #FFFDF9",
    boxShadow: "0 8px 20px rgba(43,45,66,0.35)",
    overflow: "hidden",
  });
  if (kind === "order" && image) {
    token.style.backgroundImage = `url(${image})`;
    token.style.backgroundSize = "cover";
    token.style.backgroundPosition = "center";
  } else {
    token.innerHTML = kind === "wishlist" ? HEART_SVG : CART_SVG;
  }
  document.body.appendChild(token);

  // Arc: x eases out, y eases in, so the token swoops toward the icon.
  const tl = gsap.timeline({
    onComplete: () => {
      token.remove();
      gsap.fromTo(
        target,
        { scale: 1 },
        { scale: 1.35, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    },
  });
  tl.fromTo(token, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(2)" })
    .to(token, { x: dx, duration: 0.75, ease: "power1.out" }, 0.1)
    .to(token, { y: dy, duration: 0.75, ease: "power2.in" }, 0.1)
    .to(token, { scale: 0.35, rotation: 360, duration: 0.75, ease: "power1.in" }, 0.1)
    .to(token, { opacity: 0.4, duration: 0.15 }, 0.7);
}
