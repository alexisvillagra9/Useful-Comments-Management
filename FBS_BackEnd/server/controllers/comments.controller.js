const FB_Post = require("../models/fb-post");

const commentCtrl = {};

commentCtrl.getComments = async (req, res) => {
  //const comments = await Comment.find();
  const comments = await FB_Post.aggregate([
    { $unwind: "$comments_post" },
    {
      $project: {
        _id: "$_id",
        id_reply: "$comments_post.comment_id",
        comment_date: "$comments_post.date_comment",
        comment_text: "$comments_post.post_comment",
        comment_user: "$comments_post.user_name_comment",
        comment_user_link: "$comments_post.user_link_comment",
        comment_post_link: "$post_link",
        type: "$comments_post.type",
        comment_report: "$comments_post.report_msg",
        potable: "$comments_post.potable"
      }
    },
    { $sort: { comment_date: -1 } }
  ]);
  res.json(comments);
};

commentCtrl.getCommentsPost = async (req, res) => {
  //const comments = await Comment.find();
  const commentsPost = await FB_Post.aggregate([
    {
      $project: {
        _id: "$_id",
        id_reply: "",
        comment_date: "$date_post",
        comment_text: "$msg_post",
        comment_user: "$user_name",
        comment_user_link: "$user_link",
        comment_post_link: "$post_link",
        type: "$type",
        comment_report: "$report_msg",
        potable: "$potable"
      }
    }
  ]);
  res.json(commentsPost);
};

commentCtrl.getCommentsPotables = async (req, res) => {
  //const comments = await Comment.find();
  const commentsPot = await FB_Post.aggregate([
    { $unwind: "$comments_post" },
    {
      $project: {
        _id: "$_id",
        id_reply: "$comments_post.comment_id",
        comment_date: "$comments_post.date_comment",
        comment_text: "$comments_post.post_comment",
        comment_user: "$comments_post.user_name_comment",
        comment_user_link: "$comments_post.user_link_comment",
        comment_post_link: "$post_link",
        type: "$comments_post.type",
        comment_report: "$comments_post.report_msg",
        potable: "$comments_post.potable"
      }
    },
    { $match: { potable: 1 } },
    { $sort: { comment_date: -1 } }
  ]);
  res.json(commentsPot);
};

commentCtrl.getCommentsPotablesPost = async (req, res) => {
  //const comments = await Comment.find();
  const commentsPotPost = await FB_Post.aggregate([
    { $match: { potable: 1 } },
    {
      $project: {
        _id: "$_id",
        id_reply: "",
        comment_date: "$date_post",
        comment_text: "$msg_post",
        comment_user: "$user_name",
        comment_user_link: "$user_link",
        comment_post_link: "$post_link",
        type: "$type",
        comment_report: "$report_msg",
        potable: "$potable"
      }
    }
  ]);
  res.json(commentsPotPost);
};

module.exports = commentCtrl;
