import { Socket } from "socket.io";
import { returnSocketIo } from "../server";
import todoModel from "./todoModel";
//use oop instead of modular approach

class Todo{
    private io = returnSocketIo();
    //io is private because only one instance of io should be used through out the project and it should not be accessed other than this class
    constructor(){
        this.io.on("connection",(socket)=>{
            console.log(`a client has been connected-${socket.id}`);
            
            socket.on('addData',(data)=>{
                this.addTodo(socket,data);
            })

        });
        
    
    }
   //to handle add or remove we will have to define each methods and then bind them 
   private async addTodo(socket:Socket,data:any){
    // console.log(`data has been received - ${data.task}`);
    try {
        const {task,deadline,status}= data;
        await todoModel.create({
           task,
           deadline,
           status
       });
       const allTodos = await todoModel.find();
       socket.emit('responseToAddData',{data: allTodos});
    } catch (error) {
        console.log(`error in adding todos- ${error}`)
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
   }

}
export default new Todo();
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