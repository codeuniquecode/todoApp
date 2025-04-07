import mongoose  from "mongoose";
import envConfig from "./envConfig";

async function connectDb() {
    try {
        mongoose.connection.on('connected',()=>{
            console.log('database connected successfully...');
        })
        await mongoose.connect(envConfig.conn as string);
      
    } catch (error) {
        console.log(`error in connecting db- ${error}`);
        process.exit(1); //forcefully terminate the project
    }
}
export default connectDb;