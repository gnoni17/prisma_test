"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configServer = void 0;
const dotenv_1 = require("dotenv");
const module_alias_1 = __importDefault(require("module-alias"));
function configServer() {
    (0, dotenv_1.config)({
        path: `./.env.${process.env.NODE_ENV}`,
    });
    module_alias_1.default.addAliases({
        "@utils": `${__dirname}/utils`,
        "@routes": `${__dirname}/routes`,
        "@middlerware": `${__dirname}/middlerware`,
        "@controllers": `${__dirname}/controllers`,
    });
}
exports.configServer = configServer;
