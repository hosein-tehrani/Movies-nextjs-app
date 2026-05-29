"use client";
import { revalidatePath } from "next/cache";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  favorites: [],
  counter: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      state.favorites.push(action.payload);
      const counter = state.favorites.length;
      // revalidatePath("/favorites");
      return {
        ...state,
        counter,
      };
    case "REMOVE_ITEM":
      const newSelected = state.favorites.filter(
        (item) => item.id !== action.payload.id,
      );
      const counter2 = newSelected.length;
      // revalidatePath("/favorites");
      return {
        counter: counter2,
        favorites: [...newSelected],
      };

    default:
      throw new Error("action not defined!");
  }
};

const FavoriteContext = createContext();

export default function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
}
const useFavorites = () => {
  const result = useContext(FavoriteContext);
  return result;
};
export { useFavorites };
