import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { FaThumbsUp, FaDownload, FaBookmark } from "react-icons/fa";

function ImageDetailPage({ images }) {
  const { id } = useParams();
  const image = images.find((image) => image.id === id);

  if (!image) {
    return <div>Image not found.</div>;
  }

  return (
    <div className="image-detail">
      <img src={image.urls.regular} alt={image.alt_description} />
      <div className="content">
        <div className="buttons-container">
          <button className="button">
            <FaThumbsUp />
          </button>
          <button className="button">
            <FaBookmark />
          </button>
          <button className="button">
            <FaDownload />
          </button>
        </div>
        <h2>{image.alt_description}</h2>
        <p>{image.description || "No description available."}</p>
      </div>
    </div>
  );
}

export default ImageDetailPage;
