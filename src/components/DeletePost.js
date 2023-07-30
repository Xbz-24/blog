import React from 'react';
import axios from 'axios';

const DeletePost = ({ postId, onDelete }) => {
  const handleDelete = () => {
    // Send a DELETE request to the backend API to delete the post
    axios.delete(`/api/posts/${postId}`)
      .then(response => {
        // Handle the successful deletion of the post
        console.log('Post deleted:', response.data);
        onDelete();
      })
      .catch(error => {
        // Handle errors if any
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
};

export default DeletePost;
