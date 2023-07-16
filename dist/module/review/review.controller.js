"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const review_model_1 = require("./review.model");
const throwResponse_1 = require("../../shared/throwResponse");
const giveReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { review, rating, username, book } = req.body;
    if (!review || !rating || !username || !book) {
        next(new AppError_1.default("Please provide all the details", http_status_1.default.BAD_REQUEST));
    }
    const result = yield review_model_1.Review.create(req.body);
    if (!result) {
        next(new AppError_1.default("Something went wrong", http_status_1.default.INTERNAL_SERVER_ERROR));
    }
    (0, throwResponse_1.throwResponse)(res, result, http_status_1.default.OK, "Review added successfully", true);
}));
const getReviewByBookName = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { book } = req.query;
    if (!book) {
        next(new AppError_1.default("Please provide book name", http_status_1.default.BAD_REQUEST));
    }
    const result = yield review_model_1.Review.find({ book });
    if (!result) {
        next(new AppError_1.default("Something went wrong", http_status_1.default.INTERNAL_SERVER_ERROR));
    }
    (0, throwResponse_1.throwResponse)(res, result, http_status_1.default.OK, "Review added successfully", true);
}));
exports.reviewController = {
    giveReview,
    getReviewByBookName,
};
