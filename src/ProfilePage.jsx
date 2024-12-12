import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState("This is a placeholder About Me section.");
  const [contactInfo, setContactInfo] = useState({
    phone: "(123) 456-7890",
    address: "123 Main Street, City, Country",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="profile-pic.jpg"
          alt="Profile"
          className="profile-image"
        />
        <div className="user-info">
          <h1>John Doe</h1>
          <p>Web Developer</p>
          <p>
            <a href="mailto:johndoe@example.com" className="email-link">
              johndoe@example.com
            </a>
          </p>
        </div>
      </div>

      <div className="profile-grid">
    
        <div className="card">
          <h2>About Me</h2>
          {isEditing ? (
            <textarea
              className="about-me-input"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            ></textarea>
          ) : (
            <p>{aboutMe}</p>
          )}
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditing ? "Save Changes" : "Edit"}
          </button>
        </div>

      
        <div className="card">
          <h2>Contact Info</h2>
          {isEditing ? (
            <>
              <label>
                Phone:
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, address: e.target.value })
                  }
                />
              </label>
            </>
          ) : (
            <>
              <p>Phone: {contactInfo.phone}</p>
              <p>Address: {contactInfo.address}</p>
            </>
          )}
        </div>

 
        <div className="card">
          <h2>Account Settings</h2>
          <button className="settings-button">Change Password</button>
          <button className="settings-button deactivate">Deactivate Account</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;