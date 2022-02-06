"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const diskstorage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../documents"),
    filename: (req, file, cb) => {
        // console.log(file);
        let extension = Date.now() + "-document-" + file.originalname;
        cb(null, extension);
        req.body.document = extension;
    },
});
const fileUpload = (0, multer_1.default)({
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
    storage: diskstorage,
}).single("documents");
exports.default = fileUpload;
//# sourceMappingURL=file-multer.js.map