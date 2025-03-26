"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicine = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const medicineSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    totalReviews: {
        type: Number,
        required: false,
    },
    averageRating: {
        type: Number,
        required: false,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    imageURL: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        trim: true,
    },
    requiresPrescription: {
        type: Boolean,
        default: false,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Medicine = mongoose_1.default.model("Medicine", medicineSchema);
