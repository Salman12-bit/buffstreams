import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  time: { type: String, required: true },
  matchDate: { type: String, required: true },
  content: { type: String, required: true },
  streamLink: { type: String, required: true },
  file: { type: String },
  startTime: {
    type: Date,
    required: true, 
  },
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;



