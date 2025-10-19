import { validationResult } from "express-validator"
import { apiError } from "../utils/apiError.js"

const validator = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        [err.path]: err.msg
    }))

    throw new apiError(422, "recived data is invalid", extractedErrors)
}

export { validator }