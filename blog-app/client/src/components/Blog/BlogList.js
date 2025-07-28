import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [deleteLoading, setDeleteLoading] = useState(false);
    
    const user = JSON.parse(localStorage.getItem('user'));
    const categories = ['All', 'Technology', 'Travel', 'Food', 'Lifestyle', 'Other'];
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blog');
            setPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        try {
            if (!window.confirm('Are you sure you want to delete this post?')) {
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please login to delete posts');
                return;
            }

            setDeleteLoading(true);
            
            const response = await axios.delete(`http://localhost:5000/api/blog/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
            }
        } catch (err) {
            console.error('Delete error:', err);
            setError(err.response?.data?.message || 'Failed to delete post');
        } finally {
            setDeleteLoading(false);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="blog-container">
            <div className="blog-actions">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-select-wrapper">
                    <select
                        className="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <i className="fas fa-chevron-down"></i>
                </div>

                {user && (
                    <Link to="/create-post" className="create-post-btn">
                        <i className="fas fa-plus"></i>
                        Create Post
                    </Link>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="posts-grid">
                {filteredPosts.length === 0 ? (
                    <div className="no-posts">
                        <i className="fas fa-folder-open"></i>
                        <p>No posts found</p>
                    </div>
                ) : (
                    filteredPosts.map(post => (
                        <motion.article 
                            key={post._id} 
                            className="post-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
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
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                    {user && (
                                        <div className="post-actions">
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(post._id)}
                                                disabled={deleteLoading}
                                                title="Delete post"
                                            >
                                                <i className={`fas ${deleteLoading ? 'fa-spinner fa-spin' : 'fa-trash-alt'}`}></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <Link to={`/post/${post._id}`} className="read-more">
                                    Read More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </motion.article>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogList;