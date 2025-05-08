import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', 'Technology', 'Travel', 'Food', 'Lifestyle', 'Other'];

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blog');
            setPosts(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="blog-container">
            <motion.div 
                className="blog-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Latest Blog Posts</h1>
                <div className="blog-actions">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="category-select-wrapper">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="category-select"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                    <Link to="/create-post" className="create-post-btn">
                        <i className="fas fa-plus"></i> Write New Post
                    </Link>
                </div>
            </motion.div>

            <motion.div className="category-filters">
                {categories.map(category => (
                    <motion.button
                        key={category}
                        className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>

            {loading ? (
                <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <motion.div 
                    className="posts-grid"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <motion.article 
                                key={post._id} 
                                className="post-card"
                                variants={item}
                            >
                                {post.imageUrl && (
                                    <div className="post-image">
                                        <img
                                            src={`http://localhost:5000/${post.imageUrl}`}
                                            alt={post.title}
                                            onError={(e) => {
                                                e.target.src = '/placeholder.jpg';
                                            }}
                                        />
                                        <div className="category-badge">{post.category}</div>
                                    </div>
                                )}
                                <div className="post-content">
                                    <h2>{post.title}</h2>
                                    <p>{post.content.substring(0, 150)}...</p>
                                    <div className="post-meta">
                                        <span className="post-date">
                                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <Link to={`/post/${post._id}`} className="read-more">
                                        Read More <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </motion.article>
                        ))
                    ) : (
                        <div className="no-posts">
                            <i className="fas fa-file-alt"></i>
                            <p>No posts found</p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default BlogList;