import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaRocket, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <FaRocket className="logo-icon" />
          <span className="logo-text">PitchHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/submit" className="nav-link">Submit Pitch</Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="auth-buttons">
          <Link to="/login" className="btn-login">
            <FaSignInAlt className="btn-icon" />
            Login
          </Link>
          <Link to="/register" className="btn-register">
            <FaUserPlus className="btn-icon" />
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
          <Link to="/submit" className="nav-link" onClick={closeMenu}>Submit Pitch</Link>
          <div className="mobile-auth-buttons">
            <Link to="/login" className="btn-login-mobile" onClick={closeMenu}>
              <FaSignInAlt className="btn-icon" />
              Login
            </Link>
            <Link to="/register" className="btn-register-mobile" onClick={closeMenu}>
              <FaUserPlus className="btn-icon" />
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
