import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-logo">BlogSpace</h3>
                    <p className="footer-description">
                        Share your stories, ideas, and experiences with our growing community of readers and writers.
                    </p>
                    <div className="social-links">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/blogs">Blogs</Link></li>
                        <li><Link to="/create-post">Write Blog</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Categories</h4>
                    <ul className="footer-links">
                        <li><Link to="/blogs?category=technology">Technology</Link></li>
                        <li><Link to="/blogs?category=lifestyle">Lifestyle</Link></li>
                        <li><Link to="/blogs?category=travel">Travel</Link></li>
                        <li><Link to="/blogs?category=food">Food</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="contact-info">
                        <li>
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:contact@blogspace.com">contact@blogspace.com</a>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <span>+1 234 567 890</span>
                        </li>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>123 Blog Street, Web City</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} BlogSpace. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/cookies">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;