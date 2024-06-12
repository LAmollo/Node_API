const express = require("express");
const router = express.Router();
const comments = require("../data/comments");

// GET /comments
router.get("/", (req, res) => {
  res.json(comments);
});

// POST /comments
router.post("/", (req, res) => {
  const { userId, postId, body } = req.body;
  const newComment = {
    id: comments.length + 1,
    userId,
    postId,
    body,
  };
  comments.push(newComment);
  res.json(newComment);
});

// GET /comments/:id
router.get("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

// PATCH /comments/:id
router.patch("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (comment) {
    comment.body = req.body.body;
    res.json(comment);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

// DELETE /comments/:id
router.delete("/:id", (req, res) => {
  const index = comments.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    comments.splice(index, 1);
    res.json({ message: "Comment deleted successfully" });
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

// GET /comments?userId=<VALUE>
router.get("/", (req, res) => {
  const userId = parseInt(req.query.userId);
  const userComments = comments.filter((comment) => comment.userId === userId);
  res.json(userComments);
});

// GET /comments?postId=<VALUE>
router.get("/", (req, res) => {
  const postId = parseInt(req.query.postId);
  const postComments = comments.filter((comment) => comment.postId === postId);
  res.json(postComments);
});

module.exports = router;
