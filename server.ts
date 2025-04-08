import app from '../todo/src/app';
import connectDb from './src/dbConfig';
import config from './src/envConfig';
import { Server } from 'socket.io';
const port = config.port;
function startServer(){
    const server = app.listen(port,()=>{
        connectDb();
        console.log(`server is started at port ${port}`);
    })
    const io = new Server(server);
    io.on("connection",(socket)=>{
        console.log('user connected-',socket.id);
        io.on("disconnect",()=>{
            console.log('user disconnected-',socket.id)
        })
    })
}
startServer();