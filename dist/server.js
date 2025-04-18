"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnSocketIo = returnSocketIo;
const app_1 = __importDefault(require("./src/app"));
const dbConfig_1 = __importDefault(require("./src/dbConfig"));
const envConfig_1 = __importDefault(require("./src/envConfig"));
const socket_io_1 = require("socket.io");
const port = envConfig_1.default.port;
let io;
function startServer() {
    const server = app_1.default.listen(port, () => {
        (0, dbConfig_1.default)();
        console.log(`server is started at port ${port}`);
    });
    io = new socket_io_1.Server(server);
    //reason in tsissue.txt file
    Promise.resolve().then(() => __importStar(require('./todo/todoController'))).then(() => {
        console.log('TodoController loaded after Socket.IO was initialized');
    });
}
function returnSocketIo() {
    if (!io) {
        throw new Error('Socket.io instance has not been initialized yet.');
    }
    return io;
}
startServer();
