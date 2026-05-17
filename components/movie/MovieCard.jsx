import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardLink,
  CardSubtitle,
  CardTitle,
} from "react-bootstrap";
import styles from "./MovieCard.module.css";
import CardStar from "./CardStar";
export default function MovieCard({ movie }) {
  return (
    <Card className={styles.footer}>
      <CardBody>
        <CardTitle>{movie.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">{movie.year}</CardSubtitle>
        <CardImg variant="top" src={movie.poster}></CardImg>
        {movie.genres.map((g, index) => (
          <>
            <Badge key={index} pill variant="secondary">
              {g}
            </Badge>
          </>
        ))}
        <CardFooter className={styles.footer}>
          <CardLink href={"/movies/" + movie.id}>details</CardLink>
          <div>
            <CardStar movie={movie}/>
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
