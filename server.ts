import app from '../todo/src/app';
import config from './src/envConfig';
const port = config.port;
function startServer(){
    app.listen(port,()=>{
        console.log(`server is started at port ${port}`);
    })
}
startServer();