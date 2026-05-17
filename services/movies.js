import api from "@/configs/api";

export async function getMovies() {
  const response = await api.get("/movies?page=1").then((res) => res.data);
  return response;
}
