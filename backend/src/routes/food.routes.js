import express from "express"
import { upload } from "../middlewares/multer.middlewares.js"
import { validator } from "../middlewares/validator.middlewares.js"
import { addFood, FoodList, deleteItem } from "../controllers/food.contorllers.js"
import { addFoodValidator } from "../validators/food.validators.js"

const router = express.Router()

router.route("/add").post(upload.single('image'), addFood)
router.route("/list").get(FoodList)
router.route("/delete").delete(deleteItem)

export default router