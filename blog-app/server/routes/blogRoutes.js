const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Configure multer upload
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        try {
            Post.validateImage(file);
            cb(null, true);
        } catch (err) {
            cb(new Error(err.message));
        }
    }
});

// Create post route
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;

        // Create new post
        const post = new Post({
            title: title.trim(),
            content: content.trim(),
            category: category || 'general',
            author: req.user._id,
            tags: tags ? JSON.parse(tags) : [],
            imageUrl: req.file ? req.file.filename : null,
            imageDetails: req.file ? {
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size
            } : null
        });

        await post.save();

        res.status(201).json({
            success: true,
            post: post
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create post'
        });
    }
});

module.exports = router;