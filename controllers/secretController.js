import expressAsyncHandler from "express-async-handler"
import Secret from "../models/secretModel.js"

//adding new secret
export const addSecret = expressAsyncHandler(async (req, res) => {
  try {
    //check seconds
    let expiry = new Date()
    if (req.body.seconds) {
      expiry.setSeconds(expiry.getSeconds() + req.body.seconds)
      expiry.toISOString()
    } else {
      expiry = null
    }

    let hash = Math.floor(Math.random() * 10000)
    //double check for hash
    const check = async (hash) => {
      const secretTest = await Secret.findOne({ hash })
      if (secretTest) {
        hash = Math.floor(Math.random() * 10000)
        check(hash)
      }
      return hash
    }
    const checkedHash = await check(hash)
    const secret = await new Secret({
      secret: req.body.secret,
      hash: checkedHash,
      expireAt: expiry,
    })
    const createdSecret = await secret.save()
    res.send({ message: "secret saved", secret: createdSecret })
  } catch (error) {
    res.status(400).send(error)
  }
})

//get one secret
export const getSecret = expressAsyncHandler(async (req, res) => {
  try {
    const secret = await Secret.findOne({ hash: req.query.hash })
    if (!secret) {
      res.status(400).json("No secret found with this hash")
    } else {
      res.send({ message: "secret found", secret: secret })
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

//get all secrets
export const getSecrets = expressAsyncHandler(async (req, res) => {
  try {
    const secrets = await Secret.find({})
    res.send(secrets)
  } catch (error) {
    res.status(400).send(error)
  }
})

//deleting all secrets
export const deleteSecrets = expressAsyncHandler(async (req, res) => {
  try {
    const secret = await Secret.deleteMany({})
    res.send("secrets deleted")
  } catch (error) {
    res.status(400).send(error)
  }
})
