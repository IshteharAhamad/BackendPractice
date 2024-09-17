import mongoose from "mongoose";
import {DB_name} from "../constant.js"
const connect_DB= async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/${DB_name}`)
        // console.log(`\n MongoDB connected !! DB HOST: 27017`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
export default connect_DB