import prisma from "../../prisma/index.js";
const createPost=async(req,res) =>{
    try {
        const {slug,title,body, authorId}=req.body;
        if(!slug || !title ||!body ||!authorId){
            throw new Error("All fields Are required!")
        }
        const create_post= await prisma.Post.create({
            data:
            {
                slug,
                title,
                body,
                author:{connect:{id:authorId}}
            }
        })
        res.json({success:true,data:create_post,message:"Post created successfully"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export {createPost};
