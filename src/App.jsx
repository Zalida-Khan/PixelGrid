import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { searchImages, searchUploadedImages } from "./api/api.jsx";
import SearchBar from "./SearchBar.jsx";
import ImageList from "./components/imageList.jsx";
import Pagination from "./Pagination.jsx";
import ImageDetailPage from "./ImageDetails.jsx";
import NavBar from "./NavBar.jsx";
import ProfilePage from "./ProfilePage.jsx";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const MAX_PAGES = 300;
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    dob: "01/01/1990",
    profilePic: "profile-pic.jpg",
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    const results = await searchImages(term, 1, 10, false);
    await updateResult(results);
  };

  const handleImageUpload = async (file) => {
    setCurrentPage(1);
    const results = await searchUploadedImages(file, 1, 10, true, setSearchTerm);
    await updateResult(results);
  };

  const handleURLSubmit = async (url) => {
    setSearchTerm(url);
    setCurrentPage(1);
    const results = await searchImages(url, 1, 10, true);
    await updateResult(results);
  };

  const handlePageChange = async (direction) => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (newPage >= 1 && newPage <= totalPages && newPage <= MAX_PAGES) {
      const results = await searchImages(searchTerm, newPage, 10, false);
      await updateResult(results);
      setCurrentPage(newPage);
    }
  };

  const updateResult = async (results) => {
    const maxPages = Math.min(results.totalPages, MAX_PAGES);
    setImages(results.images);
    setTotalPages(maxPages);
  };

  return (
    <Router>
      <div className="App">
        <NavBar user={user} />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  onSearch={handleSearch}
                  onImageUpload={handleImageUpload}
                  onURLSubmit={handleURLSubmit}
                />
                <ImageList images={images} />
              </>
            }
          />

          {/* Image Detail Page */}
          <Route path="/image/:id" element={<ImageDetailPage images={images} />} />

          {/* Profile Page */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        {/* Pagination shown only on the home page */}
        {images.length > 0 && window.location.pathname === "/" && (
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
