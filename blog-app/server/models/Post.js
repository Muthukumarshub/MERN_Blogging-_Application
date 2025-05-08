const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    imageUrl: {
        type: String,
        default: null
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Technology', 'Travel', 'Food', 'Lifestyle', 'Other'],
            message: '{VALUE} is not a valid category'
        },
        default: 'Other'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);