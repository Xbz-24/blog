import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('/api/posts')
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
