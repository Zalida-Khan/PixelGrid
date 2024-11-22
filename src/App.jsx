import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import searchImages from "./api/api";
import SearchBar from "./components/searchBar";
import ImageList from "./components/imageList";
import Pagination from "./components/Pagination";
import ImageDetailPage from "./components/ImageDetails";
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    const results = await searchImages(term, 1);
    setImages(results.images);
    setTotalPages(results.totalPages);
  };

  const fetchPage = async (page) => {
    const results = await searchImages(searchTerm, page);
    setImages(results.images);
    setCurrentPage(page);
  };

  const handlePageChange = (direction) => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPage(newPage);
    }
  };

  return (
    <Router>
      <div className="App">
        <SearchBar onSearch={handleSearch} />
        <Routes>
          {/* Image Gallery */}
          <Route path="/" element={<ImageList images={images} />} />

          {/* Image Detail Page */}
          <Route
            path="/image/:id"
            element={<ImageDetailPage images={images} />}
          />
        </Routes>
        {images.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
