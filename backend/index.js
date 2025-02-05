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
app.use(express.json({ limit: "16kb" })) // accept json like data from req.body
app.use(express.urlencoded({ extended: true, limit: "16kb" })) //set our url encoded for ex. %20 -> space in browser url section
app.use(express.static("public")) //used to store static file in serve / local
app.use(cookieParser()) //used to access or set the browser cookie specially we can do crud with cookie

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
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"

//route declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)