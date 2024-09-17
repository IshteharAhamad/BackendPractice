import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema= new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        // required:true
    },
    refreshToken: {
        type: String
    }
},
{timestamps:true}
)
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()     
})
userSchema.methods.isPasswordValid=async function (password) {
    return await bcrypt.compare(password,this.password)    
}
userSchema.methods.generateAccessToken= async function () {
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:process.env.EXPIRE_ACCESS
        }
    )
}
userSchema.methods.generaterefreshToken= async function () {
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn:process.env.EXPIRE_REFRESH
        }
    )
}
export const User=mongoose.model("User",userSchema)