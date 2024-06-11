const express = require("express");
const router = express.Router();
const users = require("../data/users");
const posts = require("../data/posts");
const comments = require("../data/comments"); // Import comments data
const error = require("../utilities/error");

// Retrieve all users
router.get("/", (req, res) => {
  const links = [
    {
      href: "users/:id",
      rel: ":id",
      type: "GET",
    },
  ];
  res.json({ users, links });
});

// Create a new user
router.post("/", (req, res, next) => {
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username == req.body.username)) {
      next(error(409, "Username Already Taken"));
    }
    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };
    users.push(user);
    res.json(users[users.length - 1]);
  } else next(error(400, "Insufficient Data"));
});

// Retrieve a specific user by id
router.get("/:id", (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
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
  if (user) res.json({ user, links });
  else next();
});

// Update a specific user by id
router.patch("/:id", (req, res, next) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
  });
  if (user) res.json(user);
  else next();
});

// Delete a specific user by id
router.delete("/:id", (req, res, next) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });
  if (user) res.json(user);
  else next();
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
