import express from "express";
import cookieParser from "cookie-parser"
const app=express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// router configuration
import userRouter from "./router/user.router.js"
app.use("/api/v1/user", userRouter)


export {app}