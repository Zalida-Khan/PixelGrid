import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { FaBars } from "react-icons/fa";

function NavBar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav-cont">
      <div className="hamburger" onClick={toggleMenu}>
        <FaBars size={30} color="black" />
      </div>

      <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
        </Link>

        
        <Link to="/profile">
          <img
            src={user.profilePic}
            alt="Profile"
            className="profile-pic-nav"
          />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
