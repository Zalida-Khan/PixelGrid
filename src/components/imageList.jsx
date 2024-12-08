import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function ImageList({ images }) {
  const renderedImages = images.map((image) => (
    <div key={image.id || image.link} className="image-item">
      <Link to={`/image/${image.id || image.link}`}>
        <img src={image.urls?.small || image.link} alt={image.alt_description || image.title} />
      </Link>
    </div>
  ));

  return <div className="image-list">{renderedImages}</div>;
}

export default ImageList;
