import express from "express"
import cookieParser from "cookie-parser"

const app = express()

// express middlewares
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.json({ limit: "16kb" }))
app.use(express.static("./public"))
app.use(cookieParser())
// app.use(cors())


// import routes
import foodRouter from "./routes/food.routes.js"
import userRouter from "./routes/user.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"

// register routes
app.use("/api/v1/food", foodRouter)
app.use("/images", express.static("./public/uploads"))
app.use("/api/v1/user", userRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/order", orderRouter)

// error middlewares
import { errorHandler } from "./middlewares/error.middlewares.js"
app.use(errorHandler)

export default app