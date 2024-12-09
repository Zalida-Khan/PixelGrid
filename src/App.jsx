import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {searchImages, searchUploadedImages} from "./api/api";
import SearchBar from "./components/SearchBar";
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
    setCurrentPage(1); //Rest pagination 
    const results = await searchImages(term, 1);
    await updateResult(results);
  };

  const handleImageUpload = async (file) => {
    setCurrentPage(1); //Rest pagination 
    // const reader = new FileReader();
    // reader.onloadend = async () => {
      // const base64Data = reader.result.split(",")[1];
      const results = await searchUploadedImages(file, 1, 10, true, setSearchTerm);
      await updateResult(results);
    // };
    // reader.readAsDataURL(file);
  };
  
  const handleURLSubmit = async (url) => {
    setSearchTerm(url);
    setCurrentPage(1); //Rest pagination 
    const results = await searchImages(url, 1, 10, true);
    await updateResult(results);
  }

  const handlePageChange = async (direction) => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (newPage >= 1 && newPage <= totalPages) {
      const results = await searchImages(searchTerm, newPage, 10, true);
      await updateResult(results);
      setCurrentPage(newPage);
    }
  };
  const updateResult = async (results) => {
    setImages(results.images);
    setTotalPages(results.totalPages);
  }
  
  return (
    <Router>
      <div className="App">
        <SearchBar
          onSearch={handleSearch}
          onImageUpload={handleImageUpload}
          onURLSubmit={handleURLSubmit}
        />
        <Routes>
          <Route path="/" element={<ImageList images={images} />} />
          <Route path="/image/:id" element={<ImageDetailPage images={images} />} />
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
