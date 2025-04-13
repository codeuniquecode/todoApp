import mongoose from "mongoose";
import { iTodo, TodoStatus } from "./todoTypes";
const todoSchema =new  mongoose.Schema({
    task: String,
    deadline:String,
    status:{
        type:String,
        enum:[TodoStatus.completed,TodoStatus.pending],
        default:TodoStatus.pending
    }
});
export default mongoose.model("Todo",todoSchema);