import React, { useState } from 'react';
import Posts from './Posts';
import AddPost from './AddPost';
import PostDetail from './PostDetail';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handlePostDelete = () => {
    setSelectedPostId(null);
  };

  return (
    <div>
      <Posts onSelectPost={setSelectedPostId} />
      {selectedPostId && (
        <div>
          <PostDetail postId={selectedPostId} />
          <EditPost postId={selectedPostId} />
          <DeletePost postId={selectedPostId} onDelete={handlePostDelete} />
        </div>
      )}
      <AddPost />
    </div>
  );
};

export default App;
