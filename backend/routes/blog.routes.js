const express = require("express");

const router = express.Router();

const {
  getBlogs,
  createBlog,
} = require("../controllers/blog.controller");

router.get("/", getBlogs);

router.post("/add", createBlog);

module.exports = router;