"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoTypes_1 = require("./todoTypes");
const todoSchema = new mongoose_1.default.Schema({
    task: String,
    deadline: String,
    status: {
        type: String,
        enum: [todoTypes_1.TodoStatus.completed, todoTypes_1.TodoStatus.pending],
        default: todoTypes_1.TodoStatus.pending
    }
});
exports.default = mongoose_1.default.model("Todo", todoSchema);
