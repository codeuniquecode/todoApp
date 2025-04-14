"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const todoModel_1 = __importDefault(require("./todoModel"));
//use oop instead of modular approach
class Todo {
    //io is private because only one instance of io should be used through out the project and it should not be accessed other than this class
    constructor() {
        this.io = (0, server_1.returnSocketIo)();
        this.io.on("connection", (socket) => {
            console.log(`a client has been connected-${socket.id}`);
            socket.on('addData', (data) => {
                this.addTodo(socket, data);
            });
            socket.on('deleteData', (data) => {
                this.deleteTodo(socket, data);
            });
            socket.on('updateData', (data) => {
                this.updateTodo(socket, data);
            });
            socket.on('getData', () => {
                this.getTodo(socket);
            });
        });
    }
    //to handle add or remove we will have to define each methods and then bind them 
    addTodo(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(`data has been received - ${data.task}`);
            try {
                const { task, deadline, status } = data;
                yield todoModel_1.default.create({
                    task,
                    deadline,
                    status
                });
                const allTodos = yield todoModel_1.default.find({ status: 'pending' });
                socket.emit('updatedTodo', {
                    status: "success",
                    data: allTodos
                });
            }
            catch (error) {
                socket.emit('responseError', {
                    status: "error",
                    message: `error in adding todo data - ${error}`
                });
            }
            // so instead of sending individual responses using emit we can render all todos and send it as response to optimize the code
            // if(addData){
            //     socket.emit('responseToAddData',{
            //         message:"successfully added data"
            //     });
            // }
            // else{
            //     socket.emit('responseToAddData',{
            //         message:"error in adding data"
            //     })
            // }
        });
    }
    deleteTodo(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = data;
                const deleteData = yield todoModel_1.default.findByIdAndDelete(id);
                if (!deleteData) {
                    socket.emit('responseError', {
                        status: "error",
                        message: "error in deleting todo data"
                    });
                    return;
                }
                //if deleted return all datas
                const allTodos = yield todoModel_1.default.find({ status: 'pending' });
                socket.emit('updatedTodo', {
                    status: "success",
                    data: allTodos
                });
            }
            catch (error) {
                socket.emit('responseError', {
                    status: "error",
                    message: `error in deleting todo data - ${error}`
                });
            }
        });
    }
    updateTodo(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = data.id;
                const status = data.status;
                if (!id || !status) {
                    return socket.emit('responseError', {
                        status: "error",
                        message: "Missing id or status"
                    });
                }
                const updateData = yield todoModel_1.default.findByIdAndUpdate(id, { status }, { new: true });
                if (!updateData) {
                    return socket.emit('responseError', {
                        status: "error",
                        message: "Error in updating todo data"
                    });
                }
                const allTodos = yield todoModel_1.default.find({ status: 'pending' });
                socket.emit('updatedTodo', {
                    status: "success",
                    data: allTodos
                });
            }
            catch (error) {
                console.error('❌ Update error:', error);
                socket.emit('responseError', {
                    status: "error",
                    message: `Error updating todo: ${error}`
                });
            }
        });
    }
    getTodo(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const {task, deadline, status} = data;
                const allTodos = yield todoModel_1.default.find({ status: 'pending' });
                if (!allTodos) {
                    return socket.emit('responseError', {
                        status: "error",
                        message: "there are no datas"
                    });
                }
                socket.emit('updatedTodo', {
                    status: "success",
                    data: allTodos
                });
            }
            catch (error) {
                console.error('❌ fetching error:', error);
                socket.emit('responseError', {
                    status: "error",
                    message: `error in fetching data: ${error}`
                });
            }
        });
    }
}
exports.default = new Todo();
//here the todo constructor is exported because it will be automatically called after being imported in app.ts file
// const io = returnSocketIo;
// io.on("connection",(socket)=>{
//     console.log('user connected-',socket.id);
//     io.on("disconnect",()=>{
//         console.log('user disconnected-',socket.id)
//     });
//     socket.on("receiveData",(data)=>{
//         console.log(`data aayo hai ${data.name}`);
//         socket.emit("response",{
//             message:"la aayo haii"
//         })
//     })
// });
