import React from 'react';
import BlogPost from './components/BlogPost';
import './components/BlogPost.css'; // Import the CSS file

function App() {
  const blogPosts = [
    {
      title: 'My First Blog Post',
      content: 'This is the content of my first blog post.',
    },
    {
      title: 'Another Blog Post',
      content: 'This is another blog post with some more content.',
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        {/* Your header content here */}
      </header>
      <div className="App-content">
        {blogPosts.map((post, index) => (
          <BlogPost key={index} title={post.title} content={post.content} />
        ))}
      </div>
      {/* Your footer content here */}
    </div>
  );
}

export default App;
