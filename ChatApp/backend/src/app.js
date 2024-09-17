// mongodb+srv://isthicarkhan:z7sJpwXOyZRkATsN@cluster0.wzqqp.mongodb.net/
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

import userRouter from "./routers/user.router.js"
app.use("/api/v1/user", userRouter)

export {app}