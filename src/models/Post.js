import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  time: { type: String, required: true },
  matchDate: { type: String, required: true },
  content: { type: String, required: true },
  file: { type: String },
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;



