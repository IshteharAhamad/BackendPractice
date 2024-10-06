import prisma from "../../prisma/index.js";
import { cookieToken } from "../utilities/sendCookie.js"; 
import bcrypt from "bcrypt"

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name, email);
    
    // Validate input
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const hashedpassword= await bcrypt.hash(password,10);
    // 
    const exist_user= await prisma.user.findUnique({
       where: {email}
  });
    if(exist_user){
        throw new Error("User existed are required");
    }

    // Create new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password:hashedpassword  
      }
    });

    // console.log(user);

    // Send cookie token
    cookieToken(user, res);

  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { signup };
