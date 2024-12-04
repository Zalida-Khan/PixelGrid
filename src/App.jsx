import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import searchImages from "./api/api";
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
    setCurrentPage(1);
    const results = await searchImages(term, 1);
    setImages(results.images);
    setTotalPages(results.totalPages);
  };

  const handleImageUpload = (file) => {
    console.log("Uploaded file:", file);

    if (file.name === "cat.jpg") {
      // Mock Response for `cat.jpg`
      const mockImages = [
        {
          id: "mock1",
          urls: {
            small: "/cat1.jpg", 
            regular: "/cat1.jpg",
          },
          alt_description: "A cute cat",
          description: "This is a mock result for uploading cat.jpg",
        },
      ];

      setImages(mockImages); // Set the mock images
      setTotalPages(1); // Only one page of results
      setSearchTerm("Uploaded: cat.jpg");
    } else {
      alert("No mock result available for this file.");
    }
  };

  const handlePageChange = (direction) => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (newPage >= 1 && newPage <= totalPages) {
      handleSearch(searchTerm, newPage);
    }
  };

  return (
    <Router>
      <div className="App">
        <SearchBar onSearch={handleSearch} onImageUpload={handleImageUpload} />
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
