import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
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
  news_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "NewsList",
    },
  ],
});

export const Category =
  mongoose.models.Category ?? mongoose.model("Category", categorySchema);
