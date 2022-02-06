import { Schema, model } from "mongoose";
import IMovie from "./type";

const MovieShema = new Schema<IMovie>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  trailer: {
    type: String,
    required: [true, "Trailer is required"],
  },
  state: {
    type: Boolean,
    required: false,
    default: true,
  },
});

export default model<IMovie>("Movie", MovieShema);
