import {config} from 'dotenv';
config();
const envConfig = {
    port:process.env.port
}

export default envConfig;