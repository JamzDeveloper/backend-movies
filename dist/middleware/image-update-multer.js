"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const movie_1 = __importDefault(require("../apiservices/movies/movie"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../public/images"),
    filename: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        let extension = Date.now() + "-image-" + file.originalname;
        cb(null, extension);
        const movies = yield movie_1.default.findById({ _id: req.params.id });
        console.log(movies === null || movies === void 0 ? void 0 : movies.image);
        req.body.oldimage = movies.image;
        req.body.image = `${extension}`;
    }),
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
//# sourceMappingURL=image-update-multer.js.map