"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const file_image_multer_1 = __importDefault(require("../../middleware/file-image-multer"));
const image_update_multer_1 = __importDefault(require("./util/image-update-multer"));
const validate_fields_1 = require("../../middleware/validate-fields");
const express_validator_1 = require("express-validator");
const db_validator_1 = require("./util/db-validator");
const router = (0, express_1.Router)();
router.get("/", controller_1.getMovies);
router.get("/:id", controller_1.getMovie);
router.post("/", file_image_multer_1.default, [
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    (0, express_validator_1.check)("image", "Image is required").not().isEmpty(),
    (0, express_validator_1.check)("trailer", "Trailer is required").not().isEmpty(),
    validate_fields_1.validateFields,
], controller_1.postMovie);
router.put("/:id", image_update_multer_1.default, [
    (0, express_validator_1.check)("id", "Id is required").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validator_1.existsMovie),
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    (0, express_validator_1.check)("trailer", "Trailer is required").not().isEmpty(),
    validate_fields_1.validateFields,
], controller_1.putMovie);
router.delete("/:id", [
    (0, express_validator_1.check)("id", "Id is required").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validator_1.existsMovie),
    validate_fields_1.validateFields,
], controller_1.deleteMovie);
exports.default = router;
//# sourceMappingURL=router.js.map