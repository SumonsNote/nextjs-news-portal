import mongoose, { Schema } from "mongoose";

const socialSchema = new Schema({
  facebook: {
    required: false,
    type: String,
    maxlength: 200,
  },
  youtube: {
    required: false,
    type: String,
    maxlength: 200,
  },
  twitter: {
    required: false,
    type: String,
    maxlength: 200,
  },
  linkedin: {
    required: false,
    type: String,
    maxlength: 200,
  },
  about: {
    required: false,
    type: String,
  },
  address: {
    required: false,
    type: String,
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

export const Social =
  mongoose.models.Social ?? mongoose.model("Social", socialSchema);
