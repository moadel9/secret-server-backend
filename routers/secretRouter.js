import express from "express"
import { addSecret, deleteSecrets, getSecret, getSecrets } from "../controllers/secretController.js"

const secretRouter = express.Router()

secretRouter.get("/", getSecret)
secretRouter.post("/", addSecret)
secretRouter.get("/all", getSecrets)
secretRouter.delete("/", deleteSecrets)

// playerRouter.put("/updatescore/:id", updateScore)
export default secretRouter
