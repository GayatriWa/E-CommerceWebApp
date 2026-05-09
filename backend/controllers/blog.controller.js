const Blog = require("../models/blog.model");

// GET BLOGS
const getBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find();

    res.status(200).json({
      blogs,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};

// ADD BLOG
const createBlog = async (req, res) => {

  try {

    const {
      title,
      description,
      image,
    } = req.body;

    const blog = await Blog.create({
      title,
      description,
      image,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getBlogs,
  createBlog,
};