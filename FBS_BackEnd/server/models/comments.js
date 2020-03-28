const mongoose = require("mongoose");
mongoose.set("debug", true);
const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment_id: { type: String },
  user_name_comment: { type: String },
  user_link_comment: { type: String },
  post_comment: { type: String },
  date_comment: { type: Date },
  type: { type: String },
  report_msg: { type: String },
  potable: { type: Number }
});

const Comment = mongoose.model("Comments", CommentSchema, "Comments");

module.exports = Comment;
