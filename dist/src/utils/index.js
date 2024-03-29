"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.upload = exports.toBase64 = void 0;
var convertImage_1 = require("./convertImage");
Object.defineProperty(exports, "toBase64", { enumerable: true, get: function () { return convertImage_1.toBase64; } });
var uploader_1 = require("./uploader");
Object.defineProperty(exports, "upload", { enumerable: true, get: function () { return uploader_1.upload; } });
var logger_1 = require("./logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_1.logger; } });
