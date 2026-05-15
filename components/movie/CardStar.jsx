"use client";
import { useFavorites } from "@/context/FavoritesProvider";
import { BsStar, BsStarFill } from "react-icons/bs";
export default function CardStar({ movie }) {
  const { state, dispatch } = useFavorites();
  const isFavorite = () => {
    const index = state.favorites.findIndex((item) => item.id === movie.id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      {!isFavorite() ? (
        <BsStar
          size={25}
          onClick={() => dispatch({ type: "ADD_ITEM", payload: movie })}
        />
      ) : (
        <BsStarFill
          size={25}
          color="red"
          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: movie })}
        />
      )}
    </div>
  );
}
