"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMedicineReview = exports.getMedicineReviews = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const medicine_model_1 = require("../medicine/medicine.model");
const order_model_1 = require("../order/order.model");
const medicineReview_model_1 = require("./medicineReview.model");
const getMedicineReviews = async (req, res) => {
    try {
        const { medicineId } = req.params;
        // Fetch reviews
        const reviews = await medicineReview_model_1.MedicineReview.find({
            medicineId,
        }).populate("userId", "name");
        // Fetch medicine's rating
        const medicine = await medicine_model_1.Medicine.findById(medicineId).select("averageRating totalReviews");
        res.status(200).json({
            reviews,
            averageRating: (medicine === null || medicine === void 0 ? void 0 : medicine.averageRating) || 0,
            totalReviews: (medicine === null || medicine === void 0 ? void 0 : medicine.totalReviews) || 0,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
};
exports.getMedicineReviews = getMedicineReviews;
// Function to update medicine rating
const updateMedicineRating = async (medicineId, session) => {
    const reviews = await medicineReview_model_1.MedicineReview.find({ medicineId }).session(session);
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const totalReviews = reviews === null || reviews === void 0 ? void 0 : reviews.length;
    const averageRating = totalReviews ? totalRating / totalReviews : 0;
    await medicine_model_1.Medicine.findByIdAndUpdate(medicineId, { averageRating, totalReviews }, { session });
    return { averageRating, totalReviews };
};
// Add a Review with Transaction
const addMedicineReview = async (req, res) => {
    var _a;
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { medicineId, rating, review } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        // Check if user has purchased the medicine
        const order = await order_model_1.Order.findOne({
            userId,
            "items.medicineId": medicineId,
            paymentStatus: "completed",
            status: { $in: ["pending", "processing", "shipped", "delivered"] },
        }).session(session);
        if (!order) {
            await session.abortTransaction();
            session.endSession();
            return res
                .status(403)
                .json({ message: "You can only review purchased medicines." });
        }
        // Create new review
        // Check if user has already reviewed this medicine
        const existingReview = await medicineReview_model_1.MedicineReview.findOne({
            userId,
            medicineId,
        }).session(session);
        let newReview;
        if (existingReview) {
            // Update existing review
            existingReview.rating = rating;
            existingReview.review = review;
            newReview = await existingReview.save({ session });
        }
        else {
            // Create new review
            newReview = new medicineReview_model_1.MedicineReview({
                userId,
                medicineId,
                rating,
                review,
            });
            await newReview.save({ session });
        }
        // Update medicine's average rating
        const { averageRating, totalReviews } = await updateMedicineRating(medicineId, session);
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            message: "Review added successfully",
            review: newReview,
            averageRating,
            totalReviews,
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
};
exports.addMedicineReview = addMedicineReview;
