import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <h1>Blog App</h1>
                </Link>
                
                <nav className="nav-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    {user ? (
                        <>
                            <Link to="/create-post" className="nav-link">Create Post</Link>
                            <Link to="/my-posts" className="nav-link">My Posts</Link>
                            <div className="user-menu">
                                <span className="username">{user.name}</span>
                                <button onClick={handleLogout} className="logout-button">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;