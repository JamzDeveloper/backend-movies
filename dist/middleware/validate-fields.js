"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validateFields = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        //eliminar archivos creados por error
        if (req.body.image != "undefined" && req.body.image != null) {
            let directory = path_1.default.join(__dirname, "../public/images/" + req.body.image);
            fs_1.default.unlinkSync(directory);
        }
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=validate-fields.js.map