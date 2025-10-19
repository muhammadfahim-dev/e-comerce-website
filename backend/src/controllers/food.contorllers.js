import { FoodModel } from "../models/food.model.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import fs from "fs"


const addFood = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body

    const image_file = req.file.filename
    if (!image_file) {
        throw new apiError(400, "image is required")
    }

    const food = await FoodModel.create({
        name,
        description,
        price,
        category,
        image: image_file
    })

    if (!food) {
        throw new apiError(500, "something went wrong while add the food ")
    }

    return res.json({ success: true, message: "Food Added" })
})

const FoodList = asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({})

    if (!foods) {
        throw new apiError(404, "Error")
    }

    return res.json({ success: true, data: foods })
})

const deleteItem = asyncHandler(async (req, res) => {
    const {id} = req.body
    const food = await FoodModel.findById(id)

    console.log(food)

    try {
        fs.unlinkSync(`./public/uploads/${food.image}`, () => { console.log("file delted succesfully") })
        await FoodModel.findByIdAndDelete(id)

        return res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        return res.json({ success: false, message: "Error" })
    }
})

export { addFood, FoodList, deleteItem }