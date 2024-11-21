import React from 'react';
import './ImageList.css';

function ImageList({ images }) {
  const renderedImages = images.map((image) => (
    <div key={image.id} className="image-item">
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  ));

  return <div className="image-list">{renderedImages}</div>;
}

export default ImageList;
