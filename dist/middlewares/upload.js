"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("./../utils/cloudinary"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: async (req, file) => ({
        folder: "bicycle-shop",
        format: file.mimetype.split("/")[1],
        public_id: `${file.fieldname}-${Date.now()}`,
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    }),
});
exports.upload = (0, multer_1.default)({ storage });
