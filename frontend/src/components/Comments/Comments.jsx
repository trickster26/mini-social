import { useState } from 'react';
import { addComment } from '../../api/posts';
import './Comments.css';

const Comments = ({ postId, comments = [], onCommentAdded }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim() || loading) return;

        setLoading(true);

        try {
            const result = await addComment(postId, text.trim(), 'user');

            if (result.success) {
                setText('');
                if (onCommentAdded) {
                    onCommentAdded(postId, result.data);
                }
            }
        } catch (err) {
            console.error('Error adding comment:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        return `${days}d`;
    };

    const getInitial = (name) => {
        if (!name) return 'A';
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="comments-section">
            {/* Comments List */}
            {comments.length > 0 ? (
                <div className="comments-list">
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <div className="avatar">{getInitial(comment.author)}</div>
                            <div className="comment-body">
                                <p>
                                    <span className="comment-username">{comment.author || 'Anonymous'}</span>
                                    <span className="comment-text">{comment.text}</span>
                                </p>
                                <div className="comment-meta">
                                    <span>{formatTime(comment.createdAt)}</span>
                                    <button className="reply-btn">Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-comments">No comments yet.</p>
            )}

            {/* Add Comment Form */}
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <div className="avatar">U</div>
                <div className="comment-input-wrapper">
                    <input
                        type="text"
                        className="comment-input"
                        placeholder="Add a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={loading}
                        maxLength={300}
                    />
                    <button
                        type="submit"
                        className="post-comment-btn"
                        disabled={!text.trim() || loading}
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Comments;
