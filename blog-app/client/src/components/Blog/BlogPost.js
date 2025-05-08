import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
                console.error('Error fetching post:', err);
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
                <p>Loading post...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="blog-post-error">
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="blog-post-not-found">
                <p>Post not found</p>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div className="blog-post-container">
            <article className="blog-post">
                <header className="blog-post-header">
                    <h1>{post.title}</h1>
                    <div className="post-meta">
                        <time dateTime={post.createdAt}>
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                </header>

                {post.imageUrl && (
                    <div className="blog-post-image">
                        <img
                            src={`http://localhost:5000/${post.imageUrl}`}
                            alt={post.title}
                            onError={(e) => {
                                e.target.src = '/placeholder.jpg';
                                e.target.onerror = null;
                            }}
                        />
                    </div>
                )}

                <div className="blog-post-content">
                    {post.content}
                </div>
            </article>
        </div>
    );
};

export default BlogPost;