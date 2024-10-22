import { useState } from "react";
import { searchPhotos } from "../api/unsplash"; // Import the search function
import "./searchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const results = await searchPhotos(query); // Use the updated search function
      setPhotos(results);
    } catch (error) {
      console.error("Error searching photos:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Unsplash..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="photo-grid">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
