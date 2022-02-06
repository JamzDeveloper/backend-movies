import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Movie from "./movie";

export const postMovie = async (req: Request, res: Response) => {
  const { title, description, trailer } = req.body;

  const image =
    req.body.image == "undefined" || req.body.image == "null"
      ? ""
      : req.body.image;

  //    console.log(req.body);

  const movie = new Movie({
    title,
    description,
    image,
    trailer,
  });
  movie.save();
  res.json({
    movie,
  });
};

export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.find({}).where({ state: true });

  if (movies.length == 0) {
    return res.json({
      message: "No hay peliculas en la base de datos",
    });
  }
  return res.json({
    movies,
  });
};

export const getMovie = async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id).where({ state: true });
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  return res.json({
    movie,
  });
};

export const putMovie = async (req: Request, res: Response) => {
  const { title, description, image, trailer } = req.body;

  if (req.body.oldimage != "" && req.body.oldimage != null) {
    const directory = path.join(
      __dirname,
      "../../public/images/" + req.body.oldimage
    );

    fs.unlinkSync(directory);
  }

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title,
    description,
    image,
    trailer,
  }).where({ state: true });

  return res.json({
    movie,
  });
};

export const deleteMovie = async (req: Request, res: Response) => {
  await Movie.findByIdAndUpdate(req.params.id, {
    state: false,
  }).where({ state: true });

  const movie = await Movie.findById(req.params.id);
  return res.json({
    message: "Movie deleted",
    movie,
  });
};
