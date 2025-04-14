import app from './src/app';
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
    //reason in tsissue.txt file
    import('./todo/todoController').then(() => {
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
export {returnSocketIo};