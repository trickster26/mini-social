import { Camera, AlertCircle } from 'lucide-react';
import PostCard from '../PostCard/PostCard';
import './PostFeed.css';

const PostFeed = ({ posts, loading, error, onRefresh, onCommentAdded }) => {
    if (loading && posts.length === 0) {
        return (
            <div className="post-feed">
                <div className="feed-loading">
                    <div className="spinner" />
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error && posts.length === 0) {
        return (
            <div className="post-feed">
                <div className="feed-error">
                    <AlertCircle size={40} />
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={onRefresh}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="post-feed">
            {posts.length === 0 ? (
                <div className="feed-empty">
                    <div className="empty-icon">
                        <Camera size={36} strokeWidth={1} />
                    </div>
                    <h3>Share Photos</h3>
                    <p>When you share photos, they will appear on your profile.</p>
                </div>
            ) : (
                <div className="posts-list">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onCommentAdded={onCommentAdded}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default PostFeed;
