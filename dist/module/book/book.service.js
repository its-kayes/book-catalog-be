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
exports.bookService = void 0;
const book_model_1 = require("./book.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// Add book
const saveBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const save = yield book_model_1.Book.create({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publication: book.publication,
        addedBy: book.isAuthorized._id,
    });
    return save;
});
// Update book by Id
const updateBookById = (book, id) => __awaiter(void 0, void 0, void 0, function* () {
    const findBook = yield book_model_1.Book.findById(id).lean();
    if (!findBook) {
        new AppError_1.default("No record found", http_status_1.default.NOT_FOUND);
        return null;
    }
    const isSameUser = findBook.addedBy.toString() === book.isAuthorized._id.toString();
    if (!isSameUser) {
        new AppError_1.default("You are not authorized to perform this action", http_status_1.default.UNAUTHORIZED);
        return null;
    }
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(id, book, { new: true });
    return updatedBook;
});
const getBook = (limit, skip, whereConditions, sortConditions) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find(whereConditions)
        .sort(sortConditions)
        .limit(Number(limit))
        .skip(skip);
    return books;
});
exports.bookService = {
    saveBook,
    updateBookById,
    getBook
};
