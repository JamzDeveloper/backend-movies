"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovieShema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("Movie", MovieShema);
//# sourceMappingURL=movie.js.map