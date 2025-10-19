import express from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"


const route = express.Router()

route.route("/register").post(registerUser)
route.route("/login").post(loginUser)

export default route