const mongoose = require('mongoose');

// Define the schema for the "blogs" collection
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topics: {
      type: [String], // Assuming topics is an array of strings
    },
    html: {
      type: String,
      required: true,
    },

    title_img_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model for the "blogs" collection using the schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
