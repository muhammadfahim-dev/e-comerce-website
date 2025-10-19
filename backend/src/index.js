import app from "./app.js"
import dotenv from 'dotenv'
import { connectDB } from "./db/index.db.js"

dotenv.config({
    path: "./.env"
})

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 3000

        app.listen(PORT, () => {
            console.log(`app is listening on http://localhost:${PORT}`)
        })
    })
    .catch((err) => console.log(err.message || "DB connection failure"))

