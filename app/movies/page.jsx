import MovieCard from "@/components/movie/MovieCard";
import styles from "./page.module.css";
import api from "@/configs/api";
import PaginationTemp from "@/components/templates/Pagination";
import { getMovies } from "@/services/movies";
import { unstable_noStore } from "next/cache";

// export const revalidate = 60 //راه اول: هر دقیقه کش رو پاک میکنه
export const dynamic = "force-dynamic"; // راه دوم: کلا کش نمیکنه
export default async function Home() {
  // unstable_noStore(); // راه سوم: کلا کش نمیکنه
  const { data, metadata } = await getMovies();
  console.log("data: ", data);
  console.log("metadata: ", metadata);
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
