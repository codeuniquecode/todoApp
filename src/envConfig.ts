import {config} from 'dotenv';
config();
const envConfig = {
    port:process.env.port,
    conn:process.env.mongoUri
}

export default envConfig;