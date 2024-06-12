const express = require("express");
const router = express.Router();
const users = require("../data/users");
const posts = require("../data/posts");
const comments = require("../data/comments");

// Retrieve all users
router.get("/", (req, res) => {
  res.json(users);
});

// Create a new user
router.post("/", (req, res) => {
  const { name, username, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    username,
    email,
  };
  users.push(newUser);
  res.json(newUser);
});

// Retrieve a specific user by id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Update a specific user by id
router.patch("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete a specific user by id
router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Retrieve all posts by a user with the specified id
router.get("/:id/posts", (req, res) => {
  const userId = parseInt(req.params.id);
  const userPosts = posts.filter((post) => post.userId === userId);
  res.json(userPosts);
});

// Retrieve comments by the user with the specified userId
router.get("/:id/comments", (req, res) => {
  const userId = parseInt(req.params.id);
  const userComments = comments.filter((comment) => comment.userId === userId);
  res.json(userComments);
});

module.exports = router;
