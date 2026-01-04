// In-memory data store for posts and comments
// In production, replace with a proper database

const posts = [];

module.exports = {
    posts,

    // Helper methods for data manipulation
    addPost(post) {
        posts.unshift(post); // Add to beginning for newest first
        return post;
    },

    getAllPosts() {
        return posts;
    },

    getPostById(id) {
        return posts.find(post => post.id === id);
    },

    addComment(postId, comment) {
        const post = this.getPostById(postId);
        if (post) {
            post.comments.push(comment);
            return comment;
        }
        return null;
    }
};
