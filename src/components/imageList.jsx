import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function ImageList({ images }) {
  const renderedImages = images.map((image) => (
    <div key={image.id} className="image-item">
      <Link to={`/image/${image.id}`}>
        <img src={image.urls.small} alt={image.alt_description} />
      </Link>
    </div>
  ));

  return <div className="image-list">{renderedImages}</div>;
}

export default ImageList;
