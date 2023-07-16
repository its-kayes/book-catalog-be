"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    book: {
        type: String,
        required: [true, "Book title is required"],
    },
    review: {
        type: String,
        required: [true, "Review is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be at most 5"],
        default: 1,
    },
}, {
    timestamps: true,
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
