import express from "express"
import axios from "axios"
import { redis } from "./client.js";
const app=express();
app.get("/todo", async(req,res)=>{
    const cachevalue= await redis.get("todos");
    if(cachevalue) {return res.json(JSON.parse(cachevalue)
    )}
    const {data}= await axios.get("https://jsonplaceholder.typicode.com/todos")

    await redis.set("todos",JSON.stringify(data))
    await redis.expire("todos",30)
    return res.json(data)
})
app.listen(5000);
