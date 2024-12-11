import React, { useState, useRef } from "react";
import "./App.css";

function SearchBar ({ onSearch, onImageUpload, onURLSubmit }) {
  const [term, setTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const uploadButtonRef = useRef();
  const fileInputRef = useRef();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  const handleModalToggle = () => {
    if (uploadButtonRef.current) {
      const rect = uploadButtonRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true); 
      await onImageUpload(file);
      setIsLoading(false); 
      setIsModalOpen(false);
    }
  };

  const handleURLSubmit = async () => {
    if (imageURL.trim()) {
      setIsLoading(true); 
      await onURLSubmit(imageURL.trim());
      setIsLoading(false); 
      setImageURL("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="search-container">
      <header className="header">
        <img src="/logo.png" alt="Logo" className="header-logo" />
        <h1 className="header-title">Pixel Grid</h1>
      </header>
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search..."
            className="search-input"
          />
        </form>
        <img
          src="/image_upload_button.png"
          alt="Upload"
          className="upload-icon"
          onClick={handleModalToggle}
          ref={uploadButtonRef}
        />
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left - 150}px`,
          }}
        >
          <div className="modal-content">
            <h3 className="modal-title">Visual Search</h3>
            <div className="upload-section">
              <p>
                Drag and drop your image here or{" "}
                <span onClick={() => fileInputRef.current.click()} className="browse-link">
                  Browse
                </span>{" "}
                to choose a file.
              </p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <p>Or</p>
            <div className="url-input">
              <input
                type="text"
                placeholder="Paste an image or URL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="url-input-field"
              />
              <button onClick={handleURLSubmit} className="url-submit-button" disabled={isLoading}>
                Submit
              </button>
            </div>
            {isLoading && <div className="loading-indicator">Loading...</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
