const mongoose = require("mongoose");
const Comment = require("../models/comments");

mongoose.set("debug", true);

const { Schema } = mongoose;
CommentSchema = Comment.schema;

const FbPostSchema = new Schema({
  post_id: { type: String },
  post_link: { type: String },
  date_post: { type: Date },
  user_link: { type: String },
  user_name: { type: String },
  msg_post: { type: String },
  type: { type: String },
  comments_post: [CommentSchema],
  report_msg: { type: String },
  potable: { type: Number }
});

const FbPost = mongoose.model("FB_Posts", FbPostSchema, "FB_Posts");

module.exports = FbPost;
