"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineReview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    medicineId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
}, { timestamps: true });
exports.MedicineReview = mongoose_1.default.model("MedicineReview", reviewSchema);
