import express from "express"
import cors from "cors"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"

import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// path setup
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// static folders
app.use(express.static(path.join(__dirname, "public/frontend")))
app.use("/admin", express.static(path.join(__dirname, "public/admin")))

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

// admin route
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin/index.html"))
})

// frontend route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/frontend/index.html"))
})

app.listen(port, () => {
  console.log(`Server started on PORT:${port}`)
})