import Movie from "../movie";

export const existsMovie = async (_id: string) => {
  const movie = await Movie.findById(_id).where({ state: true });
  if (!movie) {
    throw new Error("Movie not found");
  }
};

