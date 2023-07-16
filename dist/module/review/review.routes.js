"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const router = (0, express_1.Router)();
exports.ReviewRoutes = router;
router.post("/give-review", review_controller_1.reviewController.giveReview);
router.get('/reviews-for-book', review_controller_1.reviewController.getReviewByBookName);
