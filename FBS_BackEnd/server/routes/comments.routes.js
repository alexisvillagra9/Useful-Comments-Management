const express = require("express");
const router = express.Router();

const comment = require("../controllers/comments.controller");

router.get("/list-all", comment.getComments);
router.get("/list-all-post", comment.getCommentsPost);
router.get("/list-all-potables", comment.getCommentsPotables);
router.get("/list-all-potables-post", comment.getCommentsPotablesPost);

module.exports = router;
