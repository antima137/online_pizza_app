import React, { createContext, useContext, useState } from 'react';
const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item 
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, totalQuantity, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
