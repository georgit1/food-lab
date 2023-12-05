"use client";

import React, { createContext, useContext, useState } from "react";

import { FoodWithCategoryWithMain } from "@/types/types";

const initialValues: {
  favorites: FoodWithCategoryWithMain[];
  addFavorite: (item: FoodWithCategoryWithMain) => void;
  removeFavorite: (itemId: string) => void;
  revalidateFavorites: (initialData: FoodWithCategoryWithMain[]) => void;
} = {
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  revalidateFavorites: () => {},
};

const FavoritesContext = createContext(initialValues);

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FoodWithCategoryWithMain[]>([]);

  const addFavorite = (item: FoodWithCategoryWithMain) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFavorite = (itemId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== itemId),
    );
  };

  // used for optimistic update
  const revalidateFavorites = (initialData: FoodWithCategoryWithMain[]) => {
    setFavorites(initialData);
  };

  const contextValues = {
    favorites,
    addFavorite,
    removeFavorite,
    revalidateFavorites,
  };
  return (
    <FavoritesContext.Provider value={contextValues}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("FavoritesContext was used outside of FavoritesPorvider");
  }
  return context;
};

export { FavoritesProvider, useFavorites };
