const express = require('express');
const path = require('path');
const multer = require('multer');
// ...other imports...

const app = express();

// Make uploads directory static and publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add this after your other middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// Add this middleware to your post creation route
app.post('/api/blog', upload.single('image'), blogController.createPost);

// ...rest of your server configuration...