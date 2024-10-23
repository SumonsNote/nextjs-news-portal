import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  userID: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postID: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "NewsList",
  },
  description: {
    required: true,
    type: String,
    maxlength: 1000,
  },
});

export const Comment =
  mongoose.models.Comment ?? mongoose.model("Comment", commentSchema);
