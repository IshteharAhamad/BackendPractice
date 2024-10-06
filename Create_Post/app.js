import express from "express";
import cookieParser from "cookie-parser";
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.get("/",(req,res)=>{
//     return res.status(200).json({
//         message:"welcome to our page!"
//     })
// })
import postsRouter from "./src/routers/posts.router.js"
import userRouter from "./src/routers/user.router.js"
app.use("/api/user",userRouter)
app.use("/api/user",postsRouter)


export {app}