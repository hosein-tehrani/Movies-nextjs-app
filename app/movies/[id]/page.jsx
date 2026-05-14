import ImageSlideshow from "@/components/images/SlideShow";
import api from "@/configs/api";
export default async function movieDetail({ params }) {
  const details = await api.get("/movies/" + params.id).then((res) => res.data);
  console.log(details);

  return (
    <>
      <h1>{details.title}</h1>
      <ImageSlideshow images={details.images} title={details.title} />
    </>
  );
}
