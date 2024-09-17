import {User} from "../models/user.model.js"
import {AsyncHandler} from "../utilities/AsyncHandler.js"
import {ApiError} from "../utilities/ApiError.js"
import {ApiResponse} from "../utilities/ApiResponse.js"

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
const Registration=AsyncHandler(async(req,res)=>{
    const {firstname,lastname,email,password}=req.body;
    if([firstname,lastname,email,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "All fields are required!")
    }
    const existeduser= await User.findOne({email})
    if(existeduser){
        throw new ApiError(409, "User already existed!")
    }
    const user=await User.create({
        firstname,
        lastname,
        email,
        password
    })
    const createduser=await User.findById(user._id).select("-password -refreshToken")
    return res.status(200).json(new ApiResponse(201,createduser,"User created successfully!"))
})
const Loginuser= AsyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    console.log(email)
    const user= await User.findOne({email})
    if(!user){
        throw new ApiError(400, "User dooes not exist!")
     }
    const isvalidpassword=await user.isPasswordValid(password) 
    if (!isvalidpassword) {
        throw new ApiError(401,"Invalid credentials")
    }
    const {accessToken, refreshToken}=await generateAccessAndRefereshTokens(user._id)
    const loggedIn=await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200,
        {
            loggedIn,refreshToken,accessToken
        },
        "User logged In successfully"
    ))

    })
export{
    Registration,
    Loginuser,
}