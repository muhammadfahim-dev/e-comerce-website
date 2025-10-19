import { apiError } from "../utils/apiError.js"
import mongoose from "mongoose"


const errorHandler = (err, req, res, next) => {
    let error = err
    if (!(error instanceof apiError)) {
        const statusCode = error.statusCode || (error instanceof mongoose.Error ? 400 : 500)
        const message = error.message || "something went wrong"
        error = new apiError(statusCode, message, error.errors ? error.errors : [], error.stack)
    }

    let responseObj = {
        message: error.message,
        ...error,
        ...(process.env.NODE_ENV === "production" ? stack = {} : { stack : error.stack })
    }

    return res.status(error.statusCode || 500).json(responseObj)
}


export { errorHandler }