"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const v1_1 = require("./api-version/v1");
const globalErrorHandler_1 = __importDefault(require("./errors/globalErrorHandler"));
const app = (0, express_1.default)();
const options = [
    (0, cors_1.default)({
        origin: '*',
        methods: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }),
    (0, helmet_1.default)(),
    (0, morgan_1.default)('combined'),
    express_1.default.json({ limit: '50mb' }),
    express_1.default.urlencoded({ extended: true })
];
app.use(options);
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Book bazar'
    });
});
// v1 APIs route
app.use('/api/v1', v1_1.v1);
// Global Error Handler
app.use(globalErrorHandler_1.default);
// 404 handler
app.all('*', (req, res) => {
    res.status(404).json({
        message: `Can't find ${req.originalUrl} on this server!`
    });
});
exports.default = app;
