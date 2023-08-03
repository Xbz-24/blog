import React from 'react';
import NewPostForm from './NewPostForm';
import BlogPosts from './BlogPost';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>My Blog</h1>
      <div className="sidebar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="main-content">
        <NewPostForm />
        <BlogPosts />
      </div>
    </div>
  );
}

export default App;
