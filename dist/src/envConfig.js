"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const envConfig = {
    port: process.env.port,
    conn: process.env.mongoUri
};
exports.default = envConfig;
