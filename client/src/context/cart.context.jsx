/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import apis from "../api/apis";
import { useAuth } from "./auth.context";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userId } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await axios.get(`${apis.cart.get}/${userId}`);

      if (res?.data?.success) {
        const items = res?.data || [];
        setCartItems(items);
        setCartQuantity(items?.data?.length);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refetchCart = useCallback(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId, fetchCart]);

  return (
    <CartContext.Provider value={{ cartItems, cartQuantity, refetchCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
