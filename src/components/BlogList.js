import React from 'react';
import BlogPost from './BlogPost';
import './BlogList.css';

function BlogList({ posts }) {
  if (!Array.isArray(posts)) {
    // Handle the case when posts is not an array (e.g., set a default value or render an error message)
    return <div>No posts available</div>;
  }

  return (
    <div>
      {posts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}

export default BlogList;
