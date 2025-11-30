import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Product } from "../utils/mockData";
import { useToast } from "./ToastContext";

interface FavoritesState {
  items: Product[];
  loading: boolean;
}

interface FavoritesContextType extends FavoritesState {
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FavoritesState>({
    items: [],
    loading: false,
  });
  const { showSuccess } = useToast();

  useEffect(() => {
    const savedFavorites = localStorage.getItem("hengam-favorites");
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        setState((prev) => ({ ...prev, items: favorites }));
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hengam-favorites", JSON.stringify(state.items));
  }, [state.items]);

  const addToFavorites = (product: Product) => {
    setState((prev) => {
      if (prev.items.find((item) => item.id === product.id)) {
        return prev;
      }
      return {
        ...prev,
        items: [...prev.items, product],
      };
    });
    showSuccess(
      "به علاقه‌مندی‌ها اضافه شد",
      `${product.name_fa} به لیست علاقه‌مندی‌های شما اضافه شد`
    );
  };

  const removeFromFavorites = (productId: number) => {
    const product = state.items.find((item) => item.id === productId);
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== productId),
    }));
    if (product) {
      showSuccess(
        "از علاقه‌مندی‌ها حذف شد",
        `${product.name_fa} از لیست علاقه‌مندی‌های شما حذف شد`
      );
    }
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const isFavorite = (productId: number) => {
    return state.items.some((item) => item.id === productId);
  };

  const clearFavorites = () => {
    setState((prev) => ({ ...prev, items: [] }));
  };

  const getFavoritesCount = () => {
    return state.items.length;
  };

  const value: FavoritesContextType = {
    ...state,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesCount,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
