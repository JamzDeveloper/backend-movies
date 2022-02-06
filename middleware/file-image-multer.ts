import path from "path";

import multer from "multer";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"),
  filename: (req, file, cb) => {
  
    let extension = Date.now() + "-image-" + file.originalname;
    cb(null, extension);

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
