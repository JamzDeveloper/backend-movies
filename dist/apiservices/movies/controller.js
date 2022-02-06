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
exports.deleteMovie = exports.putMovie = exports.getMovie = exports.getMovies = exports.postMovie = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const movie_1 = __importDefault(require("./movie"));
const postMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, trailer } = req.body;
    const image = req.body.image == "undefined" || req.body.image == "null"
        ? ""
        : req.body.image;
    //    console.log(req.body);
    const movie = new movie_1.default({
        title,
        description,
        image,
        trailer,
    });
    movie.save();
    res.json({
        movie,
    });
});
exports.postMovie = postMovie;
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield movie_1.default.find({}).where({ state: true });
    if (movies.length == 0) {
        return res.json({
            message: "No hay peliculas en la base de datos",
        });
    }
    return res.json({
        movies,
    });
});
exports.getMovies = getMovies;
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_1.default.findById(req.params.id).where({ state: true });
    if (!movie)
        return res.status(404).json({ message: "Movie not found" });
    return res.json({
        movie,
    });
});
exports.getMovie = getMovie;
const putMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image, trailer } = req.body;
    if (req.body.oldimage != "" && req.body.oldimage != null) {
        const directory = path_1.default.join(__dirname, "../../public/images/" + req.body.oldimage);
        fs_1.default.unlinkSync(directory);
    }
    const movie = yield movie_1.default.findByIdAndUpdate(req.params.id, {
        title,
        description,
        image,
        trailer,
    }).where({ state: true });
    return res.json({
        movie,
    });
});
exports.putMovie = putMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield movie_1.default.findByIdAndUpdate(req.params.id, {
        state: false,
    }).where({ state: true });
    const movie = yield movie_1.default.findById(req.params.id);
    return res.json({
        message: "Movie deleted",
        movie,
    });
});
exports.deleteMovie = deleteMovie;
//# sourceMappingURL=controller.js.map