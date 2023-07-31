// Import React and other necessary modules
import React, { useState } from 'react';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new post object with the input values
    const newPost = {
      title: title,
      content: content,
    };

    try {
      // Send a POST request to the backend API to create a new post
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        // Post was created successfully
        // You can redirect to another page or update the list of posts
        console.log('New post created successfully');
        setTitle('');
        setContent('');
      } else {
        // Handle error cases if necessary
        console.error('Error creating a new post');
      }
    } catch (error) {
      console.error('Error sending the request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={handleContentChange} />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default NewPostForm;
