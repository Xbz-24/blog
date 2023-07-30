import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the specific post from the backend API using the postId prop
    axios.get(`/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
