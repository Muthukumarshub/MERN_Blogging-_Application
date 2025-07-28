import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-logo">Bloggifi</h3>
                    <p className="footer-description">
                        Share your stories, ideas, and experiences with our growing community of readers and writers.
                    </p>
                    
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create-post">Write Blog</Link></li>
                        <li><a href='https://muthukumar-k.web.app/'>About me</a></li>
                    </ul>
                </div>

                

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="contact-info">
                        <li>
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:mail2muthukumar007@gmail.com">mail2muthukumar007@gmail.com</a>
                        </li>
                        <li>
                            <i className="fab fa-linkedin"></i>
                            <a href="https://www.linkedin.com/in/muthukumarshub/">Muthukumar K</a>
                        </li>
                        <li>
                            <i className="fab fa-github"></i>
                            <a href="https://github.com/Muthukumarshub">Muthukumarshub</a>
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