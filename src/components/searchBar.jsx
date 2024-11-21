import React, { useState, useRef } from 'react';
import '../App.css';

function SearchBar({ onSearch, onImageUpload, onURLSubmit }) {
  const [term, setTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const uploadButtonRef = useRef();
  const fileInputRef = useRef();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  const handleModalToggle = () => {
    if (uploadButtonRef.current) {
      const rect = uploadButtonRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file);
      setIsModalOpen(false);
    }
  };

  const handleURLSubmit = () => {
    if (imageURL) {
      onURLSubmit(imageURL);
      setImageURL('');
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
          <img src="/search_icon.png" alt="Search Icon" className="search-icon" />
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search..."
            className="search-input"
          />
          <img
            src="/image_upload_button.png"
            alt="Upload"
            className="upload-icon"
            onClick={handleModalToggle}
            ref={uploadButtonRef}
          />
        </form>
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
              <img src="/upload_button.png" alt="Upload Icon" className="upload-icon-large" />
              <p>
                Drag and drop your image here or{' '}
                <span onClick={() => fileInputRef.current.click()} className="browse-link">
                  Browse
                </span>{' '}
                to choose a file.
              </p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <p>Or</p>
            <div className="url-input">
              <button onClick={handleURLSubmit} className="url-submit-button">
                <img src="/link_button.png" alt="Submit URL" />
              </button>
              <input
                type="text"
                placeholder="Paste an image or URL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="url-input-field"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;