import mongoose, { Schema } from "mongoose";

const policySchema = new Schema({
  long_des: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
    maxlength: 50,
  },
});

export const Policy =
  mongoose.models.Policy ?? mongoose.model("Policy", policySchema);
