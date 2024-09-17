import { Router } from "express";
import {Registration, Loginuser} from "../controllers/user.controller.js"

const router=Router()
router.route("/register").post(Registration)
router.route("/login").post(Loginuser)

export default router