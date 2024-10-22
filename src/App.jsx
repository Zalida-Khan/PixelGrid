import { useState } from 'react';
import searchImages from './api';
import SearchBar from './components/searchBar';
import ImageList from './components/imageList';
import MoreResultsBtn from './components/moreResultsBtn';



function App() {
  const [images, setImages] = useState([]);

  const handleSubmit = async (term) => {
    const result = await searchImages(term);

    setImages(result);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images} />
      <MoreResultsBtn />
    </div>
  );
}



export default App;