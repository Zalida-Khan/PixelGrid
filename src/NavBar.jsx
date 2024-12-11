import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { FaBars, FaThumbsUp, FaBookmark } from 'react-icons/fa';

function NavBar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="nav-cont">
      <div className="hamburger" onClick={toggleMenu}>
        <FaBars size={30} color="black" />
      </div>

      <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
        </Link>

        <div className="profile-container">
          <img
            src={user.profilePic}
            alt="Profile"
            className="profile-pic-nav"
            onClick={toggleProfileDropdown}
          />
          <div className={`profile-dropdown ${isProfileOpen ? 'active' : ''}`}>
            <Link to="/profile" className="dropdown-link">Profile</Link>
            <Link to="/liked" className="dropdown-link">
              <FaThumbsUp /> Liked
            </Link>
            <Link to="/saved" className="dropdown-link">
              <FaBookmark /> Saved
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;