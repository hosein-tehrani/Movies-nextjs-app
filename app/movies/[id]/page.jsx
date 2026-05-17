import ImageSlideshow from "@/components/images/SlideShow";
import api from "@/configs/api";
import styles from "./page.module.css";
import { FaImdb } from "react-icons/fa";
import { notFound } from "next/navigation";
import { Image } from "react-bootstrap";
export default async function movieDetail({ params }) {
  let details;
  try {
    details = await api.get("/movies/" + params.id).then((res) => res.data);
    console.log(details);
  } catch (error) {
    notFound();
  }
  if (!details) {
    notFound();
  }
  return (
    <article className={styles.detailPage}>
      <h1>{details.title}</h1>
      <p>{details.year}</p>
      <div className={styles.imageBox}>
        {details.images && details.images.length ? (
          <ImageSlideshow images={details.images} title={details.title} />
        ) : (
          <Image src={details.poster} alt={details.title} />
        )}
      </div>
      <div className={styles.detail}>
        <p className={styles.imdb}>
          <FaImdb color="yellow" size={26} /> {details.imdb_rating}
        </p>
        <p>
          <span>director: </span> {details.director}
        </p>
        <p>
          <span>writer: </span> {details.writer}
        </p>
        <p>
          <span>actors: </span> {details.actors}
        </p>
        <p>
          <span>country: </span> {details.country}
        </p>
        <p>
          <span>plot: </span> {details.plot}
        </p>
      </div>
    </article>
  );
}
