const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
const comments = require("../data/comments");

// Retrieve all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// Create a new post
router.post("/", (req, res) => {
  const { userId, title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    userId,
    title,
    content,
  };
  posts.push(newPost);
  res.json(newPost);
});

// Retrieve a specific post by id
router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Update a specific post by id
router.patch("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Delete a specific post by id
router.delete("/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index !== -1) {
    posts.splice(index, 1);
    res.json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Retrieve all comments made on the post with the specified id
router.get("/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  const postComments = comments.filter((comment) => comment.postId === postId);
  res.json(postComments);
});

module.exports = router;
