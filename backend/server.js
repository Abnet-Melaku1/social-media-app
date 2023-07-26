const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const dotenv = require("dotenv").config()
const cors = require("cors")

// Enable CORS for all routes
const connectDb = require("./config/db")
// const users = require("./routes/userRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware")
const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("common"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/posts", require("./routes/postRoutes"))
app.use(errorHandler)
app.listen(port, () => {
  console.log(`app started on server ${port}`)
})
connectDb()
