// context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  // Whenever cartItems changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === food._id);

      if (existing) {
        // Already in cart — just increase quantity
        return prev.map((item) =>
          item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // New item — add with quantity 1
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const increaseQuantity = (foodId) => {
    setCartItems((prev) =>
      prev.map((item) => (item._id === foodId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (foodId) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item._id === foodId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0) // auto-remove if quantity drops to 0
    );
  };

  const removeFromCart = (foodId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== foodId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};