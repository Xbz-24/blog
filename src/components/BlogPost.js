import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:5119':'https://blog-2e5.pages.dev'
});


const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    api.get('/api/posts')
      .then(response => {
            console.log(response.data); // Add this line
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
