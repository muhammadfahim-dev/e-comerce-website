import { User } from "../models/user.model.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import validator from "validator"


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existedUser = await User.findOne({ email })
    if (existedUser) {
        return res.json({ success: false, message: "user already exists " })
    }

    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "invalid email" })
    }

    if (password.length < 8) {
        return res.json({ success: false, message: "password minimum 8 charectors" })
    }

    const user = await User.create({
        name,
        password,
        email
    })

    const jwtToken = await user.jwtToken()

    return res.json({ success: true, jwtToken })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const existedUser = await User.findOne({ email })
    if (!existedUser) {
        return res.json({ success: false, message: "user doesn't exist" })
    }

    const isPasswordMatch = await existedUser.isPasswordCorrect(password)
    if (!isPasswordMatch) {
        return res.json({ success: false, message: "wrong password" })
    }

    const jwtToken = existedUser.jwtToken()

    return res.json({success : true, jwtToken})
})


export { registerUser, loginUser }