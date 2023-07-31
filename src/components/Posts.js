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
    fetchPosts();
  }, []);

async function fetchPosts() {
    try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setPosts(response.data);
    } catch (error) {
        console.error(`Error fetching posts: ${error}`);
    }
}


  const handleAddPost = (newPostData) => {
    // Send a post request to the backend to add the new post
    axios.post('/api/posts', newPostData)
      .then(response => {
        // Update the posts state with the newly added post
        setPosts(prevPosts => [...prevPosts, response.data]);
      })
      .catch(error => {
        console.error('Error adding post:', error);
        setError('Failed to add a new post.');
      });
  };

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
      <button onClick={() => handleAddPost({ title: 'New Post', content: 'Content of the new post' })}>
        Add New Post
      </button>
      <ConfirmDeleteModal
        isOpen={selectedPostId !== null}
        onClose={() => setSelectedPostId(null)}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default Posts;
