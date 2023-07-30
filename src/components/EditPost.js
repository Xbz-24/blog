import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch the specific post from the backend API using the postId prop
    axios.get(`/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new post object with updated title and content
    const updatedPost = { ...post, title, content };

    // Send a PUT request to the backend API to update the post
    axios.put(`/api/posts/${postId}`, updatedPost)
      .then(response => {
        // Handle the successful update of the post
        console.log('Post updated:', response.data);
        setPost(response.data);
        setSuccessMessage('Post updated successfully!');
      })
      .catch(error => {
        // Handle errors if any
        console.error('Error updating post:', error);
      });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Update Post</button>
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
};

export default EditPost;
