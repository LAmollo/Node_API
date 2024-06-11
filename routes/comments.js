// commentsRouter.js

const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

// GET /comments
router.get("/", (req, res, next) => {
  // Implementation to get all comments
});

// POST /comments
router.post("/", (req, res, next) => {
  // Implementation to create a new comment
});

// GET /comments/:id
router.get("/:id", (req, res, next) => {
  // Implementation to get a comment by ID
});

// PATCH /comments/:id
router.patch("/:id", (req, res, next) => {
  // Implementation to update a comment by ID
});

// DELETE /comments/:id
router.delete("/:id", (req, res, next) => {
  // Implementation to delete a comment by ID
});

// GET /comments?userId=<VALUE>
router.get("/", (req, res, next) => {
  // Implementation to get comments by user ID
});

// GET /comments?postId=<VALUE>
router.get("/", (req, res, next) => {
  // Implementation to get comments by post ID
});

// GET /posts/:id/comments
router.get("/posts/:id/comments", (req, res, next) => {
  // Implementation to get comments on a post by ID
});

// GET /users/:id/comments
router.get("/users/:id/comments", (req, res, next) => {
  // Implementation to get comments by user ID
});

// GET /posts/:id/comments?userId=<VALUE>
router.get("/posts/:id/comments", (req, res, next) => {
  // Implementation to get comments on a post by user ID
});

// GET /users/:id/comments?postId=<VALUE>
router.get("/users/:id/comments", (req, res, next) => {
  // Implementation to get comments by user ID on a post by post ID
});

module.exports = router;


