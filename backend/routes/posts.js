const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const postsController = require('../controllers/postsController');

// POST /api/posts - Create a new post with image and caption
router.post('/', upload.single('image'), postsController.createPost);

// GET /api/posts - Get all posts
router.get('/', postsController.getAllPosts);

// POST /api/posts/:id/comments - Add a comment to a post
router.post('/:id/comments', postsController.addComment);

module.exports = router;
