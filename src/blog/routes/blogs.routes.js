const express = require('express');
const multer = require('multer');
const blogController = require('../controllers/blog.controller');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });
cloudinary.config({
  cloud_name: 'dfoggertn',
  api_secret: 'x6COZ5w5NHzXAERWB9tEAPZ5ORg',
  api_key: '432835678819765',
});
// Route for creating a new blog
router.post('/create', upload.single('titleImage'), blogController.createBlog);
router.post('/uploadImage', upload.single('image'), blogController.uploadImage);
router.post('/allBlogs', blogController.paginatedBlogs);

module.exports = router;
