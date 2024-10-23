import mongoose, { Schema } from "mongoose";

const newsListSchema = new Schema({
  title: {
    required: true,
    type: String,
    maxlength: 100,
  },
  short_des: {
    required: true,
    type: String,
    maxlength: 400,
  },
  img1: {
    required: false,
    type: String,
    maxlength: 300,
  },
  img2: {
    required: false,
    type: String,
    maxlength: 300,
  },
  img3: {
    required: false,
    type: String,
    maxlength: 300,
  },
  img4: {
    required: false,
    type: String,
    maxlength: 300,
  },
  keywords: {
    required: false,
    type: String,
    maxlength: 300,
  },
  long_des: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
    maxlength: 200,
  },
  catID: {
    type: Schema.Types.ObjectId,
    ref: "Category",
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

export const NewsList =
  mongoose.models.NewsList ?? mongoose.model("NewsList", newsListSchema);
