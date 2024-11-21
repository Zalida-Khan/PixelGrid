import { useState } from "react";
import searchImages from "./api/api";
import SearchBar from "./components/searchBar";
import ImageList from './components/imageList';
import Pagination from "./components/Pagination";
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
    <div>
      <SearchBar onSearch={handleSearch} />
      <ImageList images={images} />
      {images.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default App;
