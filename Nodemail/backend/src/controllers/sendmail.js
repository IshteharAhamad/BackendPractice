// import express from "express";
// import dotenv from "dotenv";
import nodemailer from "nodemailer"
import {asyncHandler} from "../utilities/asyncHandler.js"
// import {ApiResponse} from "../utilities/ApiResponse.js"
// import {ApiError} from "../utilities/ApiError.js"
const transporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    // logger:true,
    // debug:true,
    // secureConnection:false,
    auth:{
        user:process.env.SMTP_MAIL,
        password:process.env.SMTP_PASSWORD
    },
    // tls:{
    //     rejectUnauthorized:true
    // }
});
 const sendemail=asyncHandler(async(req,res)=>{
    const {email,subject,message}=req.body;
    console.log(email,subject,message);
    let mailOption={
        from:process.env.SMTP_MAIL,
        to:email,
        subject:subject,
        message:message
    }
    transporter.sendMail(mailOption,function(error, info){
        if(error){
            console.log(error);
        }
       else{
        console.log("Email sent successfully!")
       }
    }
    )

 })
 export {sendemail}