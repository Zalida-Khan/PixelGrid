import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import searchImages from "./api/api";
import analyzeImage from "./api/visionApi";
import SearchBar from "./components/searchBar";
import ImageList from "./components/ImageList";
import Pagination from "./components/Pagination";
import ImageDetailPage from "./components/ImageDetails";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    const results = await searchImages(term);
    setImages(results.images);
    setTotalPages(results.totalPages);
  };

  const handleURLSearch = async (url) => {
    const labels = await analyzeImage(url);
    if (labels.length > 0) {
      const results = await searchImages(labels[0]); 
      setImages(results.images);
      setTotalPages(results.totalPages);
    }
  };

  return (
    <Router>
      <div className="App">
        <SearchBar onSearch={handleSearch} onURLSubmit={handleURLSearch} />
        <Routes>
          <Route path="/" element={<ImageList images={images} />} />
          <Route
            path="/image/:id"
            element={<ImageDetailPage images={images} />}
          />
        </Routes>
        {images.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(direction) =>
              direction === "next"
                ? handleSearch(searchTerm, currentPage + 1)
                : handleSearch(searchTerm, currentPage - 1)
            }
          />
        )}
      </div>
    </Router>
  );
}

export default App;
