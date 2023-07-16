"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../module/auth/auth.routes");
const book_routes_1 = require("../module/book/book.routes");
const review_routes_1 = require("../module/review/review.routes");
const route = (0, express_1.Router)();
exports.v1 = route;
route.get("/", (req, res) => [
    res.status(200).json({
        message: "Welcome to the Book Bazar",
    }),
]);
route.use("/auth", auth_routes_1.AuthRoutes);
route.use("/book", book_routes_1.BookRoutes);
route.use("/review", review_routes_1.ReviewRoutes);
