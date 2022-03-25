import mongoose from "mongoose"

const connectDb = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  console.log("Mongo connected successfully")
}

export default connectDb
