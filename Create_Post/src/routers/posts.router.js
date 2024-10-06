import { Router } from "express";
import { createPost } from "../controllers/posts.controller.js";
import {verifyToken} from "../middleware/isLoggedIn.js"
const router=Router()
router.route("/create-post").post(verifyToken,createPost)

export default router;