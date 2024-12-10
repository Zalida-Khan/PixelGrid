import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <nav className="nav-cont">
        <img src="logo.png" alt="Logo" className="nav-logo" />
        <div className="hamburger">
          <span>&#9776;</span>
        </div>
        <div className="nav-menu">
          <a href="#" className="dropdown-link">Home</a>
          <a href="#" className="dropdown-link">Settings</a>
          <a href="#" className="dropdown-link">Log Out</a>
        </div>
        <img src="profile-pic.jpg" alt="Profile Pic" className="profile-pic-nav" />
      </nav>

      <div className="profile-page">
        <div className="profile-header">
          <img src="profile-pic.jpg" alt="Profile" className="profile-image" />
          <div className="user-info">
            <h1>John Doe</h1>
            <p>Web Developer</p>
            <p><a href="mailto:john.doe@example.com">john.doe@example.com</a></p>
          </div>
          <button className="edit-profile" onClick={handleEditClick}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-details">
          <h2>About Me</h2>
          {isEditing ? (
            <textarea placeholder="Tell us about yourself..."></textarea>
          ) : (
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet purus et bibendum sollicitudin.</p>
          )}

          <h2>Contact Info</h2>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>

        <div className="settings">
          <h2>Account Settings</h2>
          <button className="change-password">Change Password</button>
          <button className="deactivate-account">Deactivate Account</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
