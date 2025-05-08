const Post = require('../models/Post');

// Create a new blog post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        // Create post object
        const postData = {
            title,
            content,
            author: req.user.id
        };

        // Add image URL if an image was uploaded
        if (req.file) {
            postData.imageUrl = `uploads/${req.file.filename}`;
        }

        const newPost = new Post(postData);
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ 
            message: 'Error creating post', 
            error: error.message 
        });
    }
};

// Get all blog posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 }); // Latest posts first

        res.json({
            success: true,
            posts
        });
    } catch (error) {
        console.error('Get all posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts'
        });
    }
};

// Get a single blog post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username')
            .populate('likes', 'username')
            .populate('comments.user', 'username');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.json({
            success: true,
            post
        });
    } catch (error) {
        console.error('Get post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch post'
        });
    }
};

// Update a blog post by ID
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ success: true, post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog post by ID
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};