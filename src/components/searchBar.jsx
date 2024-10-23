import React, { useState, useRef } from 'react';
import './searchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFileImage } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
  };

  const handleImageClick = () => {
    if (iconRef.current) {
      const { top, left, height } = iconRef.current.getBoundingClientRect();
      setModalPosition({
        top: top + window.scrollY + height + 10,
        left: left + window.scrollX - 20,
      });
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Pixel Grid</h1>
      <div className="search-bar">
        <form onSubmit={handleFormSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input 
            className="input" 
            value={term} 
            onChange={(e) => setTerm(e.target.value)} 
          />
          <FontAwesomeIcon
            className="file"
            icon={faFileImage}
            onClick={handleImageClick}
            ref={iconRef}
            style={{ cursor: 'pointer' }}
          />
        </form>
      </div>

      {isModalOpen && (
      <div className="modal" style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}>
        <div className="modal-content" style={{ transform: 'translate(-87%, -2%)' }}>
          <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
          <img src="/Group-1.png" style={{ width: '100%' }} alt="Modal Content" />
        </div>
      </div>
    )}
  </>
);
}

export default SearchBar;
