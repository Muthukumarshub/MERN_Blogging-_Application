const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const validatePost = require('../middleware/validatePost');
const blogController = require('../controllers/blogController');
const Post = require('../models/Post');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// Routes
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
                              .populate('author', 'username');
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { title, content, category } = req.body;
        
        // Check if required fields are present
        if (!title || !content) {
            return res.status(400).json({
                message: 'Title and content are required'
            });
        }

        // Create post object
        const postData = {
            title: title.trim(),
            content,
            category: category || 'Other', // Default to 'Other' if not provided
            author: req.user.id
        };

        // Add image if uploaded
        if (req.file) {
            postData.imageUrl = req.file.path.replace(/\\/g, '/'); // Convert Windows path to URL friendly path
        }

        // Create and save the post
        const post = new Post(postData);
        const savedPost = await post.save();

        // Populate author details
        await savedPost.populate('author', 'username');

        res.status(201).json(savedPost);

    } catch (error) {
        console.error('Error creating post:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                errors: Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        // Handle file-related errors
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File size cannot exceed 5MB'
            });
        }

        res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    }
});

router.put('/:id', auth, upload.single('image'), blogController.updatePost);
router.delete('/:id', auth, blogController.deletePost);

module.exports = router;