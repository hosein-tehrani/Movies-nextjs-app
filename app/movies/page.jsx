import MovieCard from "@/components/movie/MovieCard";
import styles from "./page.module.css";
import api from "@/configs/api";
import PaginationTemp from "@/components/templates/Pagination";

export default async function Home() {
  const response = await api.get("/movies?page=1").then((res) => res.data);
  const { data, metadata } = response;
  console.log(data, metadata);
  const selectPage = (data) => {
    console.log("selectPage: ", data);
  };
  return (
    <div className={styles.page}>
      <ul className="movies-list">
        {data.map((movie, index) => (
          <li key={movie.id + index}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
      <PaginationTemp {...metadata} />
      {/* <Pagination {...metadata} selectPage={selectPage} /> */}
    </div>
  );
}
