import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new post object
    const newPost = { title, content };

    // Send a POST request to the backend API to create a new post
    axios.post('/api/posts', newPost)
      .then(response => {
        // Handle the successful creation of the post (optional)
        console.log('Post created:', response.data);
      })
      .catch(error => {
        // Handle errors if any (optional)
        console.error('Error creating post:', error);
      });
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default AddPost;
