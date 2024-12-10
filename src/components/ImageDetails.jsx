import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ImageDetails.css';
import { FaThumbsUp, FaDownload, FaBookmark, FaArrowLeft } from 'react-icons/fa';
import CommentSection from './CommentSection';

function ImageDetailPage({ images }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const image = images.find((image) => image.id === id);

  if (!image) {
    return <div>Image not found.</div>;
  }

  return (
    <div className="image-detail">
      <button className="back-button" onClick={() => navigate('/')}>
        <FaArrowLeft />
      </button>
  
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

        <CommentSection />
      </div>
    </div>
  );
}

export default ImageDetailPage;