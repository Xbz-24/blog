import React from 'react';
import BlogPost from './BlogPost';
import './BlogList.css';

function BlogList({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}

export default BlogList;
