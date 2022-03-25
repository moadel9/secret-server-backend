import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db.js"
import secretRouter from "./routers/secretRouter.js"

dotenv.config()

const app = express()
app.use(cors())

///should be at first to upload photos
app.use(express.json({ limit: "50mb", extended: true }))
app.use(express.urlencoded({ limit: "50mb", extended: true })) //to parse the requested body
app.use(express.json())

connectDb() //connecting to database

//pathes
app.use("/api/secret", secretRouter)

app.get("/", (req, res) => {
  res.send("Hello To Secret API")
})

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
