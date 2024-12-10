import React, { useState } from 'react';
import './CommentSection.css';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment(''); 
    }
  };

  return (
    <div className="comment-section-cont">
      <div className="comment-section">
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-button" onClick={handleAddComment}>
          Post
        </button>
      </div>

      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <img
              src="/profile-pic.jpg"
              alt="Profile"
              className="profile-image"
            />
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;