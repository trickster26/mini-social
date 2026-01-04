import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { getImageUrl } from '../../api/posts';
import Comments from '../Comments/Comments';
import './PostCard.css';

const PostCard = ({ post, onCommentAdded }) => {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        const weeks = Math.floor(days / 7);

        if (minutes < 1) return 'now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;

        return `${weeks}w`;
    };

    const handleDoubleClick = () => {
        if (!liked) {
            setLiked(true);
        }
    };

    return (
        <article className="post-card">
            {/* Header */}
            <div className="post-header">
                <div className="post-user">
                    <div className="avatar-ring">
                        <div className="avatar">U</div>
                    </div>
                    <div>
                        <p className="post-username">user</p>
                    </div>
                </div>
                <button className="post-more-btn">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Image */}
            <div className="post-image-wrapper" onDoubleClick={handleDoubleClick}>
                <img
                    src={getImageUrl(post.imageUrl)}
                    alt={post.caption}
                    className="post-image"
                    loading="lazy"
                />
            </div>

            {/* Actions */}
            <div className="post-actions">
                <div className="post-actions-left">
                    <button
                        className={`action-btn ${liked ? 'liked' : ''}`}
                        onClick={() => setLiked(!liked)}
                    >
                        <Heart strokeWidth={liked ? 0 : 1.5} />
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => setShowComments(!showComments)}
                    >
                        <MessageCircle strokeWidth={1.5} />
                    </button>
                    <button className="action-btn">
                        <Send strokeWidth={1.5} />
                    </button>
                </div>
                <button
                    className={`action-btn ${saved ? 'saved' : ''}`}
                    onClick={() => setSaved(!saved)}
                >
                    <Bookmark strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Content */}
            <div className="post-content">
                {liked && (
                    <p className="post-likes">1 like</p>
                )}

                <div className="post-caption-row">
                    <span className="post-caption-username">user</span>
                    <span className="post-caption-text">{post.caption}</span>
                </div>

                {post.comments.length > 0 && !showComments && (
                    <button
                        className="view-comments-btn"
                        onClick={() => setShowComments(true)}
                    >
                        View all {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                    </button>
                )}
            </div>

            {/* Comments Section */}
            {showComments && (
                <Comments
                    postId={post.id}
                    comments={post.comments}
                    onCommentAdded={onCommentAdded}
                />
            )}

            <p className="post-time">{formatTime(post.createdAt)}</p>
        </article>
    );
};

export default PostCard;
