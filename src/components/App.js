import React from 'react';
import NewPostForm from './NewPostForm';
import BlogPosts from './BlogPost';

function App() {
  return (
    <div>
      <h1>My Blog</h1>
      <NewPostForm />
      <BlogPosts />
    </div>
  );
}

export default App;
