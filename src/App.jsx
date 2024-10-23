import { useState } from 'react';
import searchImages from './api';
import SearchBar from './components/searchBar';
import ImageList from './components/imageList';
import MoreResultsBtn from './components/MoreResultsBtn';

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (term) => {
    const result = await searchImages(term);
    setImages(result);
    setSearchTerm(term); 
  };

  const loadMoreResults = async () => {
    if (searchTerm) {
      const moreResults = await searchImages(searchTerm);
      setImages((prevImages) => [...prevImages, ...moreResults]);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images} />
      {images.length > 0 && (
        <div style={{ marginBottom: '100px' }}>
          <MoreResultsBtn onClick={loadMoreResults} />
        </div>
      )}
    </div>
  );
}

export default App;
