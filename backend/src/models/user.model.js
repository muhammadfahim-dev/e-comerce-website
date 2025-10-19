import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    },

}, { minimize: false, timestamps: true })




userSchema.pre("save", async function (next) {
    if (!(this.isModified("password"))) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.jwtToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRY })
}

const User = mongoose.model("User", userSchema)
export { User }