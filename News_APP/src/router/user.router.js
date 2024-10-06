import { Router } from "express";
import Authcontroller,{login} from "../controller/user.controller.js";

const router=Router()
router.route("/login").post(login)
router.route("/register").post(Authcontroller.register);
export default router