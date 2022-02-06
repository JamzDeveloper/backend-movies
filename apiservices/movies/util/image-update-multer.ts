import path from "path";
import multer from "multer";

import Movie from "../movie";
import MovieType from "../type";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../public/images"),
  filename: async (req, file, cb) => {
    let extension = Date.now() + "-image-" + file.originalname;
    cb(null, extension);
    const movies = await Movie.findById<MovieType>({ _id: req.params.id });
    console.log(movies?.image);
    req.body.oldimage = movies!.image;
    req.body.image = `${extension}`;
  },
});
const uploadImage = multer({
  fileFilter: (req, file, cb) => {
    var filetypes = /jpeg|jpg|png|svg/;

    var mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      cb(null, true);
    } else {
      req.body.image = null;
      cb(null, false);
    }
  },
  storage,
}).single("image");

export default uploadImage;
