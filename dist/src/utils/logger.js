"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
function createLogFile(message) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const createStream = fs_1.default.createWriteStream(`src/log/${day}-${month}-${year}.txt`);
    createStream.write(message);
    createStream.end();
}
const developmentLogger = () => ({
    info: (message) => {
        console.info(message);
    },
    warn: (message) => {
        console.warn(message);
    },
    debug: (message) => {
        console.debug(message);
    },
    error: (message) => {
        console.error(message);
    },
});
const productionLogger = () => ({
    info: (message) => { },
    warn: (message) => {
        createLogFile(message);
    },
    debug: (message) => { },
    error: (message) => {
        createLogFile(message);
    },
});
function createLogger() {
    if (process.env.NODE_ENV == "development") {
        return developmentLogger();
    }
    else {
        return productionLogger();
    }
}
exports.logger = createLogger();
