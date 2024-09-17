import { Router } from "express";
import {sendemail} from "../controllers/sendmail.js"
const router=Router();
router.route("/sendmail").post(sendemail)
export default router