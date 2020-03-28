const express = require("express");
const router = express.Router();

const fb_post = require("../controllers/fb-post.controller");

router.put("/update-post/:id", fb_post.updatePostsReport);
router.put("/update-reply/:id", fb_post.updateReportMsgReply);
router.put("/update-post-potable/:id", fb_post.updatePostsPotable);
router.put("/update-reply-potable/:id", fb_post.updateReplyPotable);

module.exports = router;
