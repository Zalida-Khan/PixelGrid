import React, { useState } from 'react';
import './searchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFileImage } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const handleImageClick = () => {
  
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <center>
        <h1>Pixel Grid</h1>
      </center>
      <div className="search-bar">
        <form onSubmit={handleFormSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input className="input" value={term} onChange={handleChange} />
          <FontAwesomeIcon
            className="file"
            icon={faFileImage}
            onClick={handleImageClick} 
            style={{ cursor: 'pointer' }}
          />
        </form>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src="/Group-1.png" 
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBar;
