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
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const auth_service_1 = require("./auth.service");
const throwResponse_1 = require("../../shared/throwResponse");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const siteEnv_1 = require("../../config/siteEnv");
const signup = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password || !req.body.email) {
        next(new AppError_1.default("Missing require Value", http_status_1.default.BAD_REQUEST));
    }
    const result = yield auth_service_1.AuthService.saveUser(req.body);
    if (!result) {
        next(new AppError_1.default("Error to Sign up", http_status_1.default.INTERNAL_SERVER_ERROR));
    }
    return (0, throwResponse_1.throwResponse)(res, result, http_status_1.default.OK, "Signup", true);
}));
const signin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        next(new AppError_1.default("Missing require Value", http_status_1.default.BAD_REQUEST));
    }
    const result = yield auth_service_1.AuthService.verifyUser(req.body);
    if (!result) {
        next(new AppError_1.default("Error to Sign in", http_status_1.default.INTERNAL_SERVER_ERROR));
    }
    const payload = {
        _id: result._id,
        username: result.username,
    };
    const options = {
        expiresIn: siteEnv_1.JWT_ACCESS_TOKEN_EXPIRES_IN
    };
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken(payload, options);
    const data = {
        accessToken,
        user: {
            _id: result._id,
            username: result.username,
        }
    };
    return (0, throwResponse_1.throwResponse)(res, data, http_status_1.default.OK, "Signin", true);
}));
exports.AuthController = {
    signup,
    signin
};
