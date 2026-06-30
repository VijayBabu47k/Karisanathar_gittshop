import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

function loadWishlist() {
  try {
    const saved = localStorage.getItem('giftshop-wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem('giftshop-wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === product.id)) return prev;
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, description: product.description }];
    });
  };

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isInWishlist = (id) => items.some((i) => i.id === id);

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

const fallback = { items: [], addToWishlist: () => {}, removeFromWishlist: () => {}, isInWishlist: () => false, clearWishlist: () => {} };

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  return ctx || fallback;
}
