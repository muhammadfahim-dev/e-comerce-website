import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"

const authMiddleware = asyncHandler(async (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized, please login" })
  }

  const token = authHeader.split(" ")[1] // remove "Bearer "

  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

  req.body.userId = decodedToken._id

  next()
})

export { authMiddleware }
