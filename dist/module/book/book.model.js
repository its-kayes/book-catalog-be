"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
    },
    publication: {
        type: String,
        required: [true, "Publication is required"],
    },
    addedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
