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
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const siteEnv_1 = require("../config/siteEnv");
const createToken = (payload, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!siteEnv_1.JWT_SECRET)
        throw new Error('JWT_SECRET is not defined');
    if (!payload)
        throw new Error('Payload is not defined');
    if (!options) {
        options = {
            expiresIn: '1d'
        };
    }
    const token = jsonwebtoken_1.default.sign(payload, siteEnv_1.JWT_SECRET, options);
    return token;
});
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!siteEnv_1.JWT_SECRET)
        throw new Error('JWT_SECRET is not defined');
    if (!token)
        throw new Error('Token is not defined');
    const decoded = jsonwebtoken_1.default.verify(token, siteEnv_1.JWT_SECRET);
    return decoded;
});
exports.jwtHelpers = {
    createToken,
    verifyToken
};
