const Blog = require('../models/blogs.model');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
// Function to upload an image to Cloudinary
async function uploadImageToCloudinary(path) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(path, {
        // public_id: "",
        folder: 'blogimages',
      })
      .then((result) => {
        console.log(result);
        resolve(result.url);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// Controller function for creating a new blog
async function createBlog(req, res) {
  try {
    const { title, topics, html, content } = req.body;
    console.log(req.file);
    // const titleImageBuffer = req.file.path;
    const finalPath = path.join(__dirname, '../../../', req.file.path);
    console.log(finalPath);

    const fileContent = req.file.path;

    // Upload the title image to Cloudinary
    const titleImageUrl = await uploadImageToCloudinary(finalPath);

    // Create a new blog document in the database
    const newBlog = new Blog({
      title,
      topics,
      html,
      content,
      title_img_url: titleImageUrl,
    });

    await newBlog.save();
    res.status(201).json({ success: true, newBlog });
  } catch (error) {
    console.error('Error creating a new blog:', error);
    res
      .status(500)
      .json({ success: false, error: 'Error creating a new blog' });
  }
}
async function uploadImage(req, res) {
  try {
    console.log(req.file);
    // const titleImageBuffer = req.file.path;
    const finalPath = path.join(__dirname, '../../../', req.file.path);
    console.log(finalPath);

    const fileContent = req.file.path;

    // Upload the title image to Cloudinary
    const url = await uploadImageToCloudinary(finalPath);

    // Create a new blog document in the database

    // await newBlog.save();
    res.status(201).json({ success: true, url: url });
  } catch (error) {
    console.error('Error creating a new blog:', error);
    res
      .status(500)
      .json({ success: false, error: 'Error creating a new blog' });
  }
}

async function paginatedBlogs(req, res) {
  try {
    const page = req.body.page || 1; // Get the page number from the query parameters (default to 1)
    const pageSize = req.body.maxcount; // Number of blogs per page
    console.log(req.body);
    const skip = (page - 1) * pageSize;
    const limit = pageSize * 2; // Fetch 4 times the pageSize (5 current + 3 previous)

    const totalBlogs = await Blog.countDocuments(); // Get the total number of blogs

    // Fetch the current and previous blogs
    const blogs = await Blog.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Assuming you have a 'createdAt' field in your schema for sorting

    res.status(200).json({
      success: true,
      current: blogs.slice(0, pageSize),
      previous: blogs.slice(pageSize),
      total: totalBlogs,
    });
  } catch (error) {
    console.error('Error fetching paginated blogs:', error);
    res
      .status(500)
      .json({ success: false, error: 'Error fetching paginated blogs' });
  }
}
module.exports = {
  createBlog,
  uploadImage,
  paginatedBlogs,
};
