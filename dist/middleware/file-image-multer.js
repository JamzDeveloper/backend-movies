"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../public/images"),
    filename: (req, file, cb) => {
        let extension = Date.now() + "-image-" + file.originalname;
        cb(null, extension);
        req.body.image = `${extension}`;
    },
});
const uploadImage = (0, multer_1.default)({
    fileFilter: (req, file, cb) => {
        var filetypes = /jpeg|jpg|png|svg/;
        var mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            cb(null, true);
        }
        else {
            req.body.image = null;
            cb(null, false);
        }
    },
    storage,
}).single("image");
exports.default = uploadImage;
//# sourceMappingURL=file-image-multer.js.map