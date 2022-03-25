import mongoose from "mongoose"

const secretSchema = new mongoose.Schema(
  {
    secret: { type: String },
    hash: { type: Number },
    number: Number,
    expireAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// secretSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 })

const Secret = mongoose.model("Secret", secretSchema)
export default Secret
