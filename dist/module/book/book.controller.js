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
exports.bookController = void 0;
const throwResponse_1 = require("../../shared/throwResponse");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const book_service_1 = require("./book.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const book_model_1 = require("./book.model");
const http_status_1 = __importDefault(require("http-status"));
// Add book 
const addBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, genre, publication } = req.body;
    if (!title || !author || !genre || !publication) {
        next(new AppError_1.default("Please provide all the details", http_status_1.default.BAD_REQUEST));
    }
    const book = yield book_service_1.bookService.saveBook(req.body);
    if (!book) {
        next(new AppError_1.default("Something went wrong", http_status_1.default.INTERNAL_SERVER_ERROR));
    }
    return (0, throwResponse_1.throwResponse)(res, book, http_status_1.default.OK, "Book added successfully", true);
}));
// Book Details by id
const bookDetailsById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        next(new AppError_1.default("Please provide book id", http_status_1.default.BAD_REQUEST));
    }
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        next(new AppError_1.default("No record found", http_status_1.default.NOT_FOUND));
    }
    return (0, throwResponse_1.throwResponse)(res, book, http_status_1.default.OK, "Book details fetched successfully", true);
}));
// Delete book
const deleteBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        next(new AppError_1.default("Please provide book id", http_status_1.default.BAD_REQUEST));
    }
    const isBookExit = yield book_model_1.Book.findById(id).lean();
    if (!isBookExit) {
        return next(new AppError_1.default("No record found", http_status_1.default.NOT_FOUND));
    }
    const isSameUser = isBookExit.addedBy.toString() === req.body.isAuthorized._id;
    if (!isSameUser) {
        return next(new AppError_1.default("You are not allow to delete this book", http_status_1.default.UNAUTHORIZED));
    }
    const drop = yield book_model_1.Book.findByIdAndDelete(id);
    if (!drop) {
        return next(new AppError_1.default("Something went wrong", http_status_1.default.INTERNAL_SERVER_ERROR));
    }
    return (0, throwResponse_1.throwResponse)(res, drop, http_status_1.default.OK, "Book deleted successfully", true);
}));
// Update book
const updateBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        next(new AppError_1.default("Please provide book id", http_status_1.default.BAD_REQUEST));
    }
    const update = yield book_service_1.bookService.updateBookById(req.body, id);
    if (!update || null) {
        next(new AppError_1.default("Something went wrong", http_status_1.default.INTERNAL_SERVER_ERROR));
    }
    return (0, throwResponse_1.throwResponse)(res, update, http_status_1.default.OK, "Book updated successfully", true);
}));
// Get all books
const getBooks = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page, sortBy, sortOrder, 
    // minPrice,
    // maxPrice,
    // location,
    searchTerm } = req.query;
    const skip = (Number(page) - 1) * Number(limit) || 0;
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
    const whereConditions = {};
    const addWhereCondition = (field, regexOptions, value) => {
        whereConditions[field] = {
            $regex: value,
            $options: regexOptions
        };
    };
    // if (minPrice && maxPrice) {
    //   whereConditions.price = {
    //     $gte: Number(minPrice),
    //     $lte: Number(maxPrice)
    //   };
    // }
    // if (location) {
    //   addWhereCondition('location', 'i', location);
    // }
    if (searchTerm) {
        const searchFields = ['title', 'author', 'genre'];
        whereConditions.$or = searchFields.map(field => ({
            [field]: {
                $regex: searchTerm,
                $options: 'i'
            }
        }));
    }
    const result = yield book_service_1.bookService.getBook(Number(limit), skip, whereConditions, sortConditions);
    const meta = {
        page: Number(page) || 1,
        limit: Number(limit) || 10
    };
    (0, throwResponse_1.throwResponse)(res, result, http_status_1.default.OK, 'Book fetched successfully', true, meta);
}));
exports.bookController = {
    addBook,
    bookDetailsById,
    deleteBook,
    updateBook,
    getBooks
};
