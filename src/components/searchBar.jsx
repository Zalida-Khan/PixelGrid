import React, { useState, useRef } from "react";
import "../App.css";

function SearchBar({ onSearch, onURLSubmit }) {
  const [term, setTerm] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  const handleURLSubmit = (e) => {
    e.preventDefault();
    if (imageURL) {
      onURLSubmit(imageURL);
      setImageURL("");
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
            placeholder="Search images..."
            className="search-input"
          />
          <button type="submit">Search</button>
        </form>
        <form onSubmit={handleURLSubmit}>
          <input
            type="text"
            placeholder="Paste image URL..."
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="search-input"
          />
          <button type="submit">Search by URL</button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
