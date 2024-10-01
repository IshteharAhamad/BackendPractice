import express from "express"
import { redis } from "./client.js";
// import dotenv from "dotenv";
// dotenv.config({
//     path:'./.env'
// })
const app=express();
async function gettingName() {
    await redis.set("Name:1","hey kk bk");

}
gettingName();

const Port=process.env.PORT||8000;
app.get("/",async(req,res)=>{
    const result= await redis.get("Name:1")

    return res.json(`hey, my Application is running on docker image ${result}`)
})
app.listen(Port,()=>{
    console.log(`Application is running on ${Port}`)
})