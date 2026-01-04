import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create a new post with image and caption
export const createPost = async (imageFile, caption) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('caption', caption);

    const response = await api.post('/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Get all posts
export const getAllPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
};

// Add a comment to a post
export const addComment = async (postId, text, author = '') => {
    const response = await api.post(`/posts/${postId}/comments`, {
        text,
        author,
    });
    return response.data;
};

// Get full image URL
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}${imagePath}`;
};

export default api;
