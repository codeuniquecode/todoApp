import app from '../todo/src/app';
import connectDb from './src/dbConfig';
import config from './src/envConfig';
import { Server } from 'socket.io';
const port = config.port;



let io: Server | undefined;
function startServer(){
    const server = app.listen(port,()=>{
        connectDb();
        console.log(`server is started at port ${port}`);
    })
     io = new Server(server);
  
}
function returnSocketIo(){
    if(!io){
        throw new Error('there is no io');
    }
    return io
}
startServer();
export {returnSocketIo};