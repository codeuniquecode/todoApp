import app from '../todo/src/app';
import connectDb from './src/dbConfig';
import config from './src/envConfig';
const port = config.port;
function startServer(){
    app.listen(port,()=>{
        connectDb();
        console.log(`server is started at port ${port}`);
    })
}
startServer();