import { useState, useRef } from 'react';
import { X, Image, AlertCircle } from 'lucide-react';
import { createPost } from '../../api/posts';
import './CreatePost.css';

const CreatePost = ({ onPostCreated, isOpen, onClose, onOpen }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                setError('Please select a JPG or PNG image');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('Image must be less than 5MB');
                return;
            }

            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError(null);
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClose = () => {
        setImage(null);
        setPreview(null);
        setCaption('');
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    const handleSubmit = async () => {
        if (!image || !caption.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const result = await createPost(image, caption.trim());

            if (result.success) {
                handleClose();
                if (onPostCreated) {
                    onPostCreated(result.data);
                }
            } else {
                setError(result.message || 'Failed to create post');
            }
        } catch (err) {
            console.error('Error creating post:', err);
            setError(err.response?.data?.message || 'Failed to share. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Trigger */}
            <div className="create-post-trigger">
                <div className="create-trigger-inner">
                    <div className="avatar avatar-lg">U</div>
                    <button className="create-trigger-input" onClick={onOpen}>
                        What's on your mind?
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="create-modal-overlay" onClick={handleClose}>
                    <div className="create-modal" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="create-modal-header">
                            <button className="modal-close-btn" onClick={handleClose}>
                                <X size={24} />
                            </button>
                            <h2>Create new post</h2>
                            <button
                                className="modal-share-btn"
                                onClick={handleSubmit}
                                disabled={loading || !image || !caption.trim()}
                            >
                                {loading ? 'Sharing...' : 'Share'}
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ position: 'relative' }}>
                            {!preview ? (
                                <div className="upload-area">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg"
                                        onChange={handleImageChange}
                                        className="upload-input"
                                    />
                                    <div className="upload-content">
                                        <Image size={64} strokeWidth={1} className="upload-icon" />
                                        <p className="upload-text">Drag photos here</p>
                                        <p className="upload-hint">JPG, PNG up to 5MB</p>
                                        <button className="upload-btn">Select from computer</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="image-preview-area">
                                    <img src={preview} alt="Preview" className="preview-image" />
                                    <button className="remove-preview-btn" onClick={removeImage}>
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            {preview && (
                                <div className="caption-area">
                                    <div className="caption-input-row">
                                        <div className="avatar">U</div>
                                        <textarea
                                            placeholder="Write a caption..."
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                            maxLength={2200}
                                        />
                                    </div>
                                    <p className="char-count">{caption.length}/2,200</p>
                                </div>
                            )}

                            {error && (
                                <div className="create-error">
                                    <AlertCircle size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            {loading && (
                                <div className="loading-overlay">
                                    <div className="spinner" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePost;
