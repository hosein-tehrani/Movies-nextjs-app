import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
} from "react-bootstrap";
import styles from "./page.module.css";
import api from "@/configs/api";

export default async function Home() {
  const movies = await api.get("/movies?page=1").then((res) => res.data.data);

  return (
    <div className={styles.page}>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li>
            <Card key={movie.id}>
              <CardBody>
                <CardTitle>{movie.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  {movie.year}
                </CardSubtitle>
                <CardImg variant="top" src={movie.poster}></CardImg>
                {movie.genres.map((g, index) => (
                  <>
                    <Badge key={index} pill variant="secondary">
                      {g}
                    </Badge>
                  </>
                ))}
                <hr />
                <CardLink href={"/movies/" + movie.id}>details</CardLink>
                <CardLink href="#">Another Link</CardLink>
              </CardBody>
            </Card>
            ;
          </li>
        ))}
      </ul>
    </div>
  );
}
