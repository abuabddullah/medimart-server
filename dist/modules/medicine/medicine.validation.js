"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedicineSchema = exports.createMedicineSchema = void 0;
const zod_1 = require("zod");
exports.createMedicineSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2),
        manufacturer: zod_1.z.string().min(2),
        price: zod_1.z.number().positive(),
        stock: zod_1.z.number().int().min(0),
        totalReviews: zod_1.z.number().optional(),
        averageRating: zod_1.z.number().optional(),
        category: zod_1.z.string().min(2),
        requiresPrescription: zod_1.z.boolean().or(zod_1.z.string()),
        description: zod_1.z.string().optional(),
        expiryDate: zod_1.z.string().or(zod_1.z.date()),
    }),
});
exports.updateMedicineSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        manufacturer: zod_1.z.string().min(2).optional(),
        price: zod_1.z.number().positive().optional(),
        genericName: zod_1.z.string().optional(),
        stock: zod_1.z.number().int().min(0).optional(),
        totalReviews: zod_1.z.number().optional(),
        averageRating: zod_1.z.number().optional(),
        category: zod_1.z.string().optional(),
        requiresPrescription: zod_1.z.boolean().or(zod_1.z.string()).optional(),
        imageURL: zod_1.z.string().url().optional(),
        description: zod_1.z.string().optional(),
        expiryDate: zod_1.z.string().or(zod_1.z.date()).optional(),
        dosage: zod_1.z.string().optional(),
        sideEffects: zod_1.z.string().optional(),
    }),
});
