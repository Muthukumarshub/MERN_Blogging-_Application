import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './BlogPost.css';

const BlogPost = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
                if (response.data) {
                    setPost(response.data);
                }
            } catch (err) {
                setError('Failed to load post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="blog-post-loading">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div 
                className="blog-post-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <i className="fas fa-exclamation-circle"></i>
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </motion.div>
        );
    }

    if (!post) {
        return (
            <div className="blog-post-not-found">
                <i className="fas fa-search"></i>
                <p>Post not found</p>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <motion.div 
            className="blog-post-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <article className="blog-post">
                <header className="blog-post-header">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {post.title}
                    </motion.h1>
                    <div className="post-meta">
                        <div className="post-info">
                            <span className="post-category">
                                <i className="fas fa-folder"></i>
                                {post.category}
                            </span>
                            <span className="post-date">
                                <i className="fas fa-calendar"></i>
                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            {post.author && (
                                <span className="post-author">
                                    <i className="fas fa-user"></i>
                                    {post.author.username}
                                </span>
                            )}
                        </div>
                    </div>
                </header>

                {post.imageUrl && (
                    <motion.div 
                        className="blog-post-image"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <img
                            src={`http://localhost:5000/${post.imageUrl}`}
                            alt={post.title}
                            onError={(e) => {
                                e.target.src = '/placeholder.jpg';
                                e.target.onerror = null;
                            }}
                        />
                    </motion.div>
                )}

                <motion.div 
                    className="blog-post-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {post.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </motion.div>

                <footer className="blog-post-footer">
                    <div className="post-actions">
                        <button onClick={() => navigate('/')} className="back-button">
                            <i className="fas fa-arrow-left"></i> Back to Posts
                        </button>
                    </div>
                </footer>
            </article>
        </motion.div>
    );
};

export default BlogPost;