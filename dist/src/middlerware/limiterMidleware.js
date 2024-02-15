"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = exports.Authlimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.Authlimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
