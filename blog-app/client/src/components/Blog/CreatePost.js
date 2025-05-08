import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './CreatePost.css';

const CreatePost = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [post, setPost] = useState({
        title: '',
        content: '',
        category: 'Other', // Set default category
        image: null
    });

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'general',
        tags: []
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [touched, setTouched] = useState({});

    const categories = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Other'];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Image must be less than 5MB');
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('category', formData.category);
            if (image) {
                formDataToSend.append('image', image);
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post(
                'http://localhost:5000/api/blog',
                formDataToSend,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data) {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating post');
            console.error('Create post error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="create-post-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="create-post-header">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Create New Post
                </motion.h2>
                <div className="create-post-divider"></div>
            </div>

            {error && (
                <motion.div 
                    className="error-message"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    {error}
                </motion.div>
            )}
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <motion.div 
                    className="form-group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <label htmlFor="title">
                        Title <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        onBlur={() => setTouched({...touched, title: true})}
                        className={`form-input ${touched.title && !formData.title ? 'invalid' : ''}`}
                        placeholder="Enter post title"
                    />
                </motion.div>

                <motion.div 
                    className="form-group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={post.category}
                        onChange={handleInputChange}
                        required
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </motion.div>

                <motion.div 
                    className="form-group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <label htmlFor="content">
                        Content <span className="required">*</span>
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        onBlur={() => setTouched({...touched, content: true})}
                        className={`form-textarea ${touched.content && !formData.content ? 'invalid' : ''}`}
                        placeholder="Write your post content here..."
                        rows="12"
                    />
                </motion.div>

                <motion.div 
                    className="form-group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <label>Cover Image</label>
                    <div 
                        className="image-upload-area"
                        onClick={() => fileInputRef.current.click()}
                    >
                        {imagePreview ? (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                                <button
                                    type="button"
                                    className="remove-image"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImage(null);
                                        setImagePreview(null);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <i className="fas fa-cloud-upload-alt"></i>
                                <p>Click to upload image</p>
                                <span>Max size: 5MB</span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                </motion.div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    className={`submit-button ${loading ? 'loading' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        'Create Post'
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default CreatePost;