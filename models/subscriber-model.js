import mongoose, { Schema } from "mongoose";

const subscriberSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    maxlength: 100,
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

export const Subscriber =
  mongoose.models.Subscriber ?? mongoose.model("Subscriber", subscriberSchema);
