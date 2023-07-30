import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ErrorAlert from './ErrorAlert';

const Posts = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    // Fetch all posts from the backend API
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch posts.');
        setIsLoading(false);
      });
  }, []);

  const handleDeletePost = (postId) => {
    setSelectedPostId(postId);
  };

  const handleConfirmDelete = () => {
    // Send delete request to the backend
    axios.delete(`/api/posts/${selectedPostId}`)
      .then(() => {
        // Remove the deleted post from the state
        setPosts(posts.filter(post => post.id !== selectedPostId));
        setSelectedPostId(null);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        setSelectedPostId(null);
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id} onClick={() => onSelectPost(post.id)}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ConfirmDeleteModal
        isOpen={selectedPostId !== null}
        onClose={() => setSelectedPostId(null)}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default Posts;
