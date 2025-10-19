import { body } from "express-validator"


const addFoodValidator = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage("food name is required"),

        body("description")
            .notEmpty()
            .withMessage("description is required"),

        body("category")
            .notEmpty()
            .withMessage("category is required"),

        body("price")
            .notEmpty()
            .withMessage("price is required"),
    ]
}


export { addFoodValidator }