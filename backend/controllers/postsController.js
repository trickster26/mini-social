const { v4: uuidv4 } = require('uuid');
const dataStore = require('../storage/data');

// Create a new post
const createPost = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Image is required'
            });
        }

        const { caption } = req.body;

        if (!caption || caption.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Caption is required'
            });
        }

        const post = {
            id: uuidv4(),
            imageUrl: `/uploads/${req.file.filename}`,
            caption: caption.trim(),
            createdAt: new Date().toISOString(),
            comments: []
        };

        dataStore.addPost(post);

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create post'
        });
    }
};

// Get all posts
const getAllPosts = (req, res) => {
    try {
        const posts = dataStore.getAllPosts();

        res.status(200).json({
            success: true,
            data: posts,
            count: posts.length
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts'
        });
    }
};

// Add a comment to a post
const addComment = (req, res) => {
    try {
        const { id } = req.params;
        const { text, author } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Comment text is required'
            });
        }

        const post = dataStore.getPostById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        const comment = {
            id: uuidv4(),
            text: text.trim(),
            author: author?.trim() || 'Anonymous',
            createdAt: new Date().toISOString()
        };

        dataStore.addComment(id, comment);

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            data: comment
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add comment'
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    addComment
};
