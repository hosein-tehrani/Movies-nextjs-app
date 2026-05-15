"use client";
import MovieCard from "@/components/movie/MovieCard";
import styles from "./page.module.css";
import { useFavorites } from "@/context/FavoritesProvider";

export default function Home() {
  const { state } = useFavorites();

  return (
    <div className={styles.page}>
      <ul className="movies-list">
        {state.favorites.map((movie, index) => (
          <li key={movie.id + index}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
