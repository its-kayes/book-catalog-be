"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_ACCESS_TOKEN_EXPIRES_IN = exports.PORT = exports.NODE_ENV = exports.MONGO_URI = exports.JWT_SECRET = exports.JWT_EXPIRES_IN = exports.FRONTEND_BASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, FRONTEND_BASE_URL, JWT_ACCESS_TOKEN_EXPIRES_IN, NODE_ENV } = process.env;
exports.PORT = PORT;
exports.MONGO_URI = MONGO_URI;
exports.JWT_SECRET = JWT_SECRET;
exports.JWT_EXPIRES_IN = JWT_EXPIRES_IN;
exports.FRONTEND_BASE_URL = FRONTEND_BASE_URL;
exports.JWT_ACCESS_TOKEN_EXPIRES_IN = JWT_ACCESS_TOKEN_EXPIRES_IN;
exports.NODE_ENV = NODE_ENV;
