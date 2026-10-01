import { useState } from "react";
import { useCart } from "../lib/CartContext";

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4 6 4c2.1 0 3.6 1.1 4.5 2.4C11.4 5.1 12.9 4 15 4c3.7 0 5.5 3.8 4 7.2-2.5 4.7-10 9.3-10 9.3z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <path d="M2.5 3h2l2.2 11.2a1.8 1.8 0 0 0 1.78 1.5h7.6a1.8 1.8 0 0 0 1.77-1.46L19.5 7.5H6" />
    </svg>
  );
}

function CardActions({ itemId, className = "" }) {
  const cart = useCart();
  const [justAdded, setJustAdded] = useState(false);

  if (!cart) return null;
  const { isWishlisted, toggleWishlist, addToOrder } = cart;
  const wishlisted = isWishlisted(itemId);

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(itemId);
  };

  const handleAddOrder = (e) => {
    e.stopPropagation();
    addToOrder(itemId, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div
      className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-30 flex flex-col gap-1.5 sm:gap-2 ${className}`}
    >
      <button
        type="button"
        onClick={handleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer active:scale-90 ${
          wishlisted
            ? "bg-[#F4A261] border-[#F4A261] text-[#2B2D42] scale-105 shadow-sm"
            : "bg-black/50 border-white/30 text-[#FFFDF9] hover:border-[#F8B583] hover:text-[#F8B583]"
        }`}
      >
        <span className="w-4 h-4 sm:w-4 sm:h-4">
          <HeartIcon filled={wishlisted} />
        </span>
      </button>
      <button
        type="button"
        onClick={handleAddOrder}
        aria-label="Add to order"
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer active:scale-90 ${
          justAdded
            ? "bg-[#F4A261] border-[#F4A261] text-[#2B2D42] scale-110 shadow-sm"
            : "bg-black/50 border-white/30 text-[#FFFDF9] hover:border-[#F8B583] hover:text-[#F8B583]"
        }`}
      >
        <span className="w-4 h-4 sm:w-4 sm:h-4">
          <CartIcon />
        </span>
      </button>
    </div>
  );
}

export default CardActions;
