import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import { useToast } from "./ToastContext";
import type { CartItem, Product } from "../utils/mockData";

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number; variations?: any } }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  addItem: (product: Product, quantity?: number, variations?: any) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1, variations } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedVariations) === JSON.stringify(variations)
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedVariations) === JSON.stringify(variations)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
        };
      } else {
        const newItem: CartItem = {
          id: Date.now(),
          product,
          quantity,
          selectedVariations: variations,
        };
        const updatedItems = [...state.items, newItem];
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
        };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { productId } });
      }

      const updatedItems = state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalPrice: 0,
        totalItems: 0,
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    {
      items: [],
      totalPrice: 0,
      totalItems: 0,
    },
    (initialState) => {
      try {
        const savedCart = localStorage.getItem("hengam-cart");
        return savedCart ? JSON.parse(savedCart) : initialState;
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return initialState;
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("hengam-cart", JSON.stringify(state));
  }, [state]);

  const { showSuccess } = useToast();

  const addItem = (product: Product, quantity: number = 1, variations?: any) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity, variations } });
    showSuccess("محصول به سبد خرید اضافه شد", `${product.name_fa} به سبد خرید شما اضافه شد`);
  };

  const removeItem = (productId: number) => {
    const item = state.items.find((item) => item.product.id === productId);
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
    if (item) {
      showSuccess("محصول حذف شد", `${item.product.name_fa} از سبد خرید حذف شد`);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    showSuccess("سبد خرید پاک شد", "تمام محصولات از سبد خرید حذف شدند");
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
