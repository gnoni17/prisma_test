"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = void 0;
const fs_1 = __importDefault(require("fs"));
function toBase64(filePath) {
    const img = fs_1.default.readFileSync(filePath);
    const base64 = Buffer.from(img).toString('base64');
    return "data:image/png;base64," + base64;
}
exports.toBase64 = toBase64;
