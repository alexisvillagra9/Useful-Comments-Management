const FB_Post = require("../models/fb-post");

const fb_Post_Ctrl = {};

fb_Post_Ctrl.updatePostsReport = async (req, res) => {
  const id = { _id: req.params.id };
  const post = {
    report_msg: req.body.report_msg
  };

  await FB_Post.findOneAndUpdate(id, { $set: post });

  res.json({ status: 1 });
};

fb_Post_Ctrl.updateReportMsgReply = async (req, res) => {
  //const regexIdReply = new RegExp(req.body.id_reply);
  const regexIdReply = { $regex: ".*" + req.body.id_reply + ".*" };
  var status = {};

  const id = {
    _id: req.params.id,
    "comments_post.comment_id": regexIdReply
  };
  const reply = {
    "comments_post.$.report_msg": req.body.report_msg
  };

  //const queryUp =
  await FB_Post.update(id, { $set: reply }, function(err, res) {
    if (err != null) {
      status = { status: -1 };
    } else {
      status = { status: 1 };
    }
  }); //.getUpdate();

  //console.log(queryUp);

  res.json(status);
};

fb_Post_Ctrl.updatePostsPotable = async (req, res) => {
  const id = { _id: req.params.id };
  const potable = {
    potable: req.body.potable
  };

  await FB_Post.findOneAndUpdate(id, { $set: potable });

  res.json({ status: 1 });
};

fb_Post_Ctrl.updateReplyPotable = async (req, res) => {
  //const regexIdReply = new RegExp(req.body.id_reply);
  const regexIdReply = { $regex: ".*" + req.body.id_reply + ".*" };
  var status = {};

  const id = {
    _id: req.params.id,
    "comments_post.comment_id": regexIdReply
  };
  const potable = {
    "comments_post.$.potable": req.body.potable
  };

  console.log('comprueba',id)

  //const queryUp =
  await FB_Post.updateMany(id, { $set: potable }, function(err, res) {
    if (err != null) {
      status = { status: -1 };
    } else {
      status = { status: 1 };
    }
  }); //.getUpdate();

  //console.log(queryUp);

  res.json(status);
};

module.exports = fb_Post_Ctrl;
