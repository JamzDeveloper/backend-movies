import { Router } from "express";
import {
  getMovie,
  getMovies,
  postMovie,
  putMovie,
  deleteMovie,
} from "./controller";
import uploadImage from "../../middleware/file-image-multer";
import uploadUpdateImage from "./util/image-update-multer";
import { validateFields } from "../../middleware/validate-fields";
import { check } from "express-validator";
import { existsMovie } from "./util/db-validator";
const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post(
  "/",
  uploadImage,
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("image", "Image is required").not().isEmpty(),
    check("trailer", "Trailer is required").not().isEmpty(),
    validateFields,
  ],
  postMovie
);

router.put(
  "/:id",
  uploadUpdateImage,
  [
    check("id", "Id is required").isMongoId(),
    check("id").custom(existsMovie),
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("trailer", "Trailer is required").not().isEmpty(),
    validateFields,
  ],
  putMovie
);

router.delete(
  "/:id",
  [
    check("id", "Id is required").isMongoId(),
    check("id").custom(existsMovie),
    validateFields,
  ],
  deleteMovie
);

export default router;
