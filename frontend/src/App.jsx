import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import CreatePost from './components/CreatePost/CreatePost';
import PostFeed from './components/PostFeed/PostFeed';
import { getAllPosts } from './api/posts';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getAllPosts();
      if (result.success) {
        setPosts(result.data);
      } else {
        setError(result.message || 'Failed to load posts');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleCommentAdded = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div className="app">
      <Header onCreateClick={() => setIsCreateOpen(true)} />

      <main className="main-content">
        <CreatePost
          onPostCreated={handlePostCreated}
          isOpen={isCreateOpen}
          onOpen={() => setIsCreateOpen(true)}
          onClose={() => setIsCreateOpen(false)}
        />

        <PostFeed
          posts={posts}
          loading={loading}
          error={error}
          onRefresh={fetchPosts}
          onCommentAdded={handleCommentAdded}
        />
      </main>
    </div>
  );
}

export default App;
