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
exports.isVerified = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const siteEnv_1 = require("../config/siteEnv");
const AppError_1 = __importDefault(require("../errors/AppError"));
const isVerified = 
// (...permissions: string[]) =>
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // ================ Authentication ==================
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new AppError_1.default('No Authorization Token', http_status_1.default.NOT_FOUND);
        }
        const decoded = jsonwebtoken_1.default.verify(token, siteEnv_1.JWT_SECRET);
        if (!decoded) {
            throw new AppError_1.default('Unauthorized User', http_status_1.default.UNAUTHORIZED);
        }
        // ================ Authorization ==================
        // Check if user has permission to access this route
        // if (permissions.length > 0 && !permissions.includes(decoded.role)) {
        //   throw new AppError(
        //     'You do not have permission to perform this action',
        //     httpStatus.FORBIDDEN
        //   );
        // }
        req.body.isAuthorized = decoded;
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.isVerified = isVerified;
