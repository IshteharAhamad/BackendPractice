import prisma from "../database/db.config.js"
import {ApiResponse} from "../utilities/ApiResponse.js"
import bcrypt from "bcrypt"
import {ApiError} from "../utilities/ApiError.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utilities/AsyncHandler.js"
// const RegisterUser=asyncHandler(async(req,res)=>{
//     const payload=req.body;
//     console.log(payload)
// })
// export{RegisterUser}
class Authcontroller{
    static async register(req,res){
        try {
            const payload=req.body; 
            if(!payload){
                throw new ApiError(400,"All fields are required!");
            }
            const salt= bcrypt.genSaltSync(10);
            payload.password= bcrypt.hashSync(payload.password,salt);
            const user=await prisma.users.findUnique({
                where:{
                    email:payload.email,
                },

            })
            if(user){
              return  new ApiError(400, "User already existed!")
            }
            const create_user= await prisma.users.create({
                data:payload
            })
            return res.status(201).json(
                new ApiResponse(
                    201,
                    create_user,
                    "User created successfully"
                )
            )

        } catch (error) {
           throw new ApiError(500,"Internal server Error") 
        }
        
    }
    // static async login(req,res){
    //     try {
    //         const {email}=req.body;
    //         console.log(email)
    //         const user= await prisma.users.findUnique({
    //             where:{
    //                 email:email,
    //             },
    //         })
    //         console.log(process.env.ACCESS_TOKEN)
    //         if(!user){
    //             throw new ApiError(401, "User does not exist!");
    //         }
    //         if(!bcrypt.compare(password,user.password)){
    //             return res.status(401).json(
    //                 new ApiResponse(401,{},"Invalid credentiols!")
    //             );
    //         }
    //         const user_data={
    //             id:user.id,
    //             name:user.name,
    //             email:user.email,
    //         }
    //         console.log(user_data)
    //         const token=jwt.sign(user_data,process.env.ACCESS_TOKEN,{
    //             expiresIn:"10d",
    //         })
    //         // console.log(token)
    //         return res.status(200).json(new ApiResponse(200,token,"Login successfully!"));
    //     } catch (error) {
    //         throw new ApiError(401,"Invalid token");
    //     }
    // }
}
const login= asyncHandler(async(req,res)=>{
    const {email, password}=req.body;
    console.log(email)
})
export {login}
export default Authcontroller;