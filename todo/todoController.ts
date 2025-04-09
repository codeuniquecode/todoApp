import { returnSocketIo } from "../server";

const io = returnSocketIo;
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