import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cart.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/add").post(authMiddleware, addToCart)
router.route("/remove").post(authMiddleware, removeFromCart)
router.route("/get").post(authMiddleware, getCart)

export default router