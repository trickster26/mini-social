# Mini Social Media Post System

A full-stack mini social media application where users can upload images, add captions, and comment on posts.

![Mini Social Media](https://img.shields.io/badge/Status-Live-success)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)

## Features

- **Post Creation**: Upload images (JPG/PNG) with captions
- **Post Feed**: View all posts with images, captions, and timestamps
- **Comments**: Add comments to any post
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Dark theme with glassmorphism effects

## Tech Stack

### Frontend
- React 18
- Vite
- Axios
- Lucide React (icons)
- Vanilla CSS with CSS Variables

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- CORS
- In-memory storage

## Deployed URLs

| Service | URL |
|---------|-----|
| Frontend | `[Add Vercel URL after deployment]` |
| Backend API | `[Add Render URL after deployment]` |

## API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "success": true,
  "message": "Mini Social Media API is running",
  "timestamp": "2026-01-04T15:00:00.000Z"
}
```

### Create Post
```
POST /api/posts
Content-Type: multipart/form-data
```
| Field | Type | Description |
|-------|------|-------------|
| image | File | Image file (JPG/PNG, max 5MB) |
| caption | String | Post caption (required) |

Response:
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": "uuid",
    "imageUrl": "/uploads/post-123456.jpg",
    "caption": "My caption",
    "createdAt": "2026-01-04T15:00:00.000Z",
    "comments": []
  }
}
```

### Get All Posts
```
GET /api/posts
```
Response:
```json
{
  "success": true,
  "data": [...posts],
  "count": 10
}
```

### Add Comment
```
POST /api/posts/:id/comments
Content-Type: application/json
```
Body:
```json
{
  "text": "Great post!",
  "author": "John" // optional, defaults to "Anonymous"
}
```

Response:
```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "id": "uuid",
    "text": "Great post!",
    "author": "John",
    "createdAt": "2026-01-04T15:00:00.000Z"
  }
}
```

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd mini-social
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
npm start
```
The backend will run on `http://localhost:5000`

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
The frontend will run on `http://localhost:5173`

4. **Open in browser**
Navigate to `http://localhost:5173`

## Project Structure

```
mini-social/
├── backend/
│   ├── config/
│   │   └── index.js          # Configuration
│   ├── controllers/
│   │   └── postsController.js # Business logic
│   ├── middleware/
│   │   └── upload.js          # Multer config
│   ├── routes/
│   │   └── posts.js           # API routes
│   ├── storage/
│   │   └── data.js            # In-memory store
│   ├── uploads/               # Uploaded images
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── posts.js       # API integration
│   │   ├── components/
│   │   │   ├── Comments/
│   │   │   ├── CreatePost/
│   │   │   ├── Header/
│   │   │   ├── PostCard/
│   │   │   └── PostFeed/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: Your Vercel frontend URL

### Frontend (Vercel)

1. Import project on Vercel
2. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Environment Variables**:
     - `VITE_API_URL`: Your Render backend URL

## Notes

- On Render's free tier, the server sleeps after 15 minutes of inactivity. First request may take ~30 seconds.
- Uploaded images are stored on the server filesystem and will be lost on redeployment (for production, use cloud storage like AWS S3 or Cloudinary).
- This project uses in-memory storage; data resets on server restart.

## License

MIT
