import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const WISHLIST_KEY = "ember_wishlist";
const ORDER_KEY = "ember_order";

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => loadFromStorage(WISHLIST_KEY, []));
  const [order, setOrder] = useState(() => loadFromStorage(ORDER_KEY, []));

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [order]);

  const isWishlisted = (id) => wishlist.includes(id);

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((x) => x !== id));
  };

  const addToOrder = (id, qty = 1) => {
    setOrder((prev) => {
      const existing = prev.find((o) => o.id === id);
      if (existing) {
        return prev.map((o) => (o.id === id ? { ...o, qty: o.qty + qty } : o));
      }
      return [...prev, { id, qty }];
    });
  };

  const removeFromOrder = (id) => {
    setOrder((prev) => prev.filter((o) => o.id !== id));
  };

  const updateOrderQty = (id, qty) => {
    if (qty <= 0) {
      removeFromOrder(id);
      return;
    }
    setOrder((prev) => prev.map((o) => (o.id === id ? { ...o, qty } : o)));
  };

  const clearOrder = () => setOrder([]);

  const orderCount = order.reduce((sum, o) => sum + o.qty, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        wishlist,
        order,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        addToOrder,
        removeFromOrder,
        updateOrderQty,
        clearOrder,
        orderCount,
        wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
