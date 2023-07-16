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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const hashPassword_1 = require("../../helpers/hashPassword");
const auth_model_1 = require("./auth.model");
const comparePassword_1 = require("../../helpers/comparePassword");
const saveUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPass = yield (0, hashPassword_1.hashPassword)(data.password);
    const save = yield auth_model_1.Auth.create({
        username: data.username,
        password: hashPass,
        email: data.email,
    });
    return save;
});
const verifyUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExit = yield auth_model_1.Auth.findOne({ email: data.email }).lean();
    if (!isUserExit) {
        throw new AppError_1.default("User not found", http_status_1.default.NOT_FOUND);
    }
    const isPasswordMatch = yield (0, comparePassword_1.comparePassword)(data.password, isUserExit.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default("Password not match", http_status_1.default.UNAUTHORIZED);
    }
    return isUserExit;
});
exports.AuthService = {
    saveUser,
    verifyUser,
};
