"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/types";
import {
  addToCart as apiAddToCart,
  createCart,
  getCart,
  isShopifyConfigured,
  redirectToCheckout,
  removeCartLines as apiRemoveLines,
  updateCartLines as apiUpdateLines,
} from "@/lib/shopify";

const CART_ID_KEY = "dawnly_cart_id";

interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  loading: boolean;
  error: string | null;
  totalQuantity: number;
  demoMode: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  buyNow: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rehydrate an existing cart on first load.
  useEffect(() => {
    let active = true;
    const storedId = window.localStorage.getItem(CART_ID_KEY);
    if (!storedId) return;
    (async () => {
      try {
        const existing = await getCart(storedId);
        if (active && existing) setCart(existing);
        else window.localStorage.removeItem(CART_ID_KEY);
      } catch {
        window.localStorage.removeItem(CART_ID_KEY);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const ensureCart = useCallback(async (): Promise<Cart> => {
    if (cart) return cart;
    const created = await createCart();
    window.localStorage.setItem(CART_ID_KEY, created.id);
    setCart(created);
    return created;
  }, [cart]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setLoading(true);
      setError(null);
      try {
        const current = await ensureCart();
        const updated = await apiAddToCart(current.id, [
          { merchandiseId, quantity },
        ]);
        setCart(updated);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
        setError("Something went wrong adding this to your cart.");
      } finally {
        setLoading(false);
      }
    },
    [ensureCart],
  );

  const buyNow = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setLoading(true);
      setError(null);
      try {
        const current = await ensureCart();
        const updated = await apiAddToCart(current.id, [
          { merchandiseId, quantity },
        ]);
        setCart(updated);
        redirectToCheckout(updated);
      } catch (err) {
        console.error(err);
        setError("Could not start checkout. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [ensureCart],
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setLoading(true);
      setError(null);
      try {
        const updated = await apiUpdateLines(cart.id, [
          { id: lineId, quantity },
        ]);
        setCart(updated);
      } catch (err) {
        console.error(err);
        setError("Could not update your cart.");
      } finally {
        setLoading(false);
      }
    },
    [cart],
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setLoading(true);
      setError(null);
      try {
        const updated = await apiRemoveLines(cart.id, [lineId]);
        setCart(updated);
      } catch (err) {
        console.error(err);
        setError("Could not remove this item.");
      } finally {
        setLoading(false);
      }
    },
    [cart],
  );

  const checkout = useCallback(() => {
    redirectToCheckout(cart);
  }, [cart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      loading,
      error,
      totalQuantity: cart?.totalQuantity ?? 0,
      demoMode: !isShopifyConfigured,
      openCart,
      closeCart,
      addItem,
      buyNow,
      updateItem,
      removeItem,
      checkout,
    }),
    [
      cart,
      isOpen,
      loading,
      error,
      openCart,
      closeCart,
      addItem,
      buyNow,
      updateItem,
      removeItem,
      checkout,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
