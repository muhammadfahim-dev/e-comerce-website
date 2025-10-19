import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from "../controllers/order.controllers.js"


const router = express.Router()

router.route("/place").post(authMiddleware, placeOrder)
router.route("/verify").post(verifyOrder)
router.route("/userorders").post(authMiddleware, userOrder)
router.route("/list").get(listOrders)
router.route("/status").post(updateStatus)

export default router