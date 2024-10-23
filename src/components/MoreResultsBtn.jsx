import React from 'react';
import './MoreResultsBtn.css';

const MoreResultsBtn = ({ onClick }) => {
  return (
    <div className="container">
    <button className="more-results-btn" onClick={onClick}>
      Load More Results
    </button>
    </div>
  );
};

export default MoreResultsBtn;
