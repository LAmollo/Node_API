const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
const comments = require("../data/comments"); // Import comments data
const error = require("../utilities/error");

// Retrieve all posts
router.get("/", (req, res) => {
  const links = [
    {
      href: "posts/:id",
      rel: ":id",
      type: "GET",
    },
  ];
  res.json({ posts, links });
});

// Create a new post
router.post("/", (req, res, next) => {
  if (req.body.userId && req.body.title && req.body.content) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };
    posts.push(post);
    res.json(posts[posts.length - 1]);
  } else next(error(400, "Insufficient Data"));
});

// Retrieve a specific post by id
router.get("/:id", (req, res, next) => {
  const post = posts.find((p) => p.id == req.params.id);
  const links = [
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "PATCH",
    },
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "DELETE",
    },
  ];
  if (post) res.json({ post, links });
  else next();
});

// Update a specific post by id
router.patch("/:id", (req, res, next) => {
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });
  if (post) res.json(post);
  else next();
});

// Delete a specific post by id
router.delete("/:id", (req, res, next) => {
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      posts.splice(i, 1);
      return true;
    }
  });
  if (post) res.json(post);
  else next();
});

// Retrieve all comments made on the post with the specified id
router.get("/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  const postComments = comments.filter((comment) => comment.postId === postId);
  res.json(postComments);
});

module.exports = router;
