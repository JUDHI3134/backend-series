import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";

const port = process.env.port || 8000

const app = express();

//middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}
))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//DB Connection
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server run port ${port}`)
        })
    })
    .catch((err) => {
    console.log("MongoDb Connection Failed")
})


//routes import
import userRouter from "./routes/user.routes.js"

//route declaration
app.use("/api/v1/users", userRouter)