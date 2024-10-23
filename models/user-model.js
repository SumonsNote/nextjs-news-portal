import mongoose, { Schema } from "mongoose";

// Users Schema
const userSchema = new Schema({
  firstName: {
    required: true,
    type: String,
    maxlength: 50,
  },
  lastName: {
    required: true,
    type: String,
    maxlength: 50,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    maxlength: 50,
  },
  mobile: {
    required: false,
    type: String,
    maxlength: 50,
  },
  password: {
    required: true,
    type: String,
    maxlength: 50,
  },
  otp: {
    required: false,
    type: String,
    maxlength: 10,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
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

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
