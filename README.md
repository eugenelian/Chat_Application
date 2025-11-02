# MERN Stack Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) featuring WebSocket connections for instant messaging, online user tracking, and multimedia support.

## ✨ Features

- **Real-time Messaging**: Instant message delivery using WebSocket connections
- **Multimedia Support**: Send both text messages and images
- **Online User Tracking**: See which users are currently online
- **Auto-refresh Messages**: Messages automatically update across all connected clients using sockets
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** (with Vite)
- **Socket.io-client** - WebSocket connections
- **Axios** - HTTP requests
- **Zustand** - Global State Manager
- **React Router** - Navigation
- **Tailwind CSS** / **DaisyUI** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Authentication
- **Cloudinary** - Image storage

## 📁 Project Structure

```
Chat_Application/
├── frontend/                        # Frontend React application
│   ├── public/                      # Stores publicly accessed thumbnail pictures, etc.
│   ├── src/                         # Main Application Component
│   │   ├── assets/                  # Images, icons, etc.
│   │   ├── components/              # Reusable components
│   │   ├── constants/               
│   │   │   └── index.js             # Stores constant values that do not change
│   │   ├── lib/
│   │   │   ├── axios.js             # Instantiate axios instance for API calls
│   │   │   └── utils.js             # Stores basic functions for the applications
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Main chat page
│   │   │   ├── LoginPage.jsx        # Login page
│   │   │   ├── ProfilePage.jsx      # Profile page
│   │   │   ├── SettingsPage.jsx     # Settings page
│   │   │   └── SignUpPage.jsx       # SignUp page
│   │   ├── store/
│   │   │   ├── useAuthStore.js      # Global State Manager for Authentication
│   │   │   ├── useChatStore.js      # Global State Manager for Chats
│   │   │   └── useThemeStore.js     # Global State Manager for Setting Themes
│   │   ├── utils/
│   │   │   └── helpers.js           # Utility functions
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── vite.config.js               # Vite configuration
│   ├── README.md                    # Details on setting up the frontend
│   └── package.json
│
├── backend/                         # Backend Node.js application
│   ├── src/                         # Main Application Component
│   │   ├── controllers/             # Logic of application 
│   │   ├── lib/                     # Configurations for cloudinary, mongo and socket.io
│   │   ├── middleware/              # Middleware to handle protected routes and API settings
│   │   ├── models/                  # Schemas used in application
│   │   ├── routes/                  # Displays routes available for each endpoint
│   │   ├── seeds/                   # Files to seed database
│   │   └── index.js                 # Entry point
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── README.md                    # Details on setting up the backend
|
├── .gitignore
├── package.json
└── README.md                        # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/eugenelian/Chat_Application.git
cd Chat_Application
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Metadata on backend
NODE_ENV=development/staging/production
PORT=5001

# MongoDB and JWT functions
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# For Image Uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Start the backend server:
```bash
npm run dev
# or
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

## 🚢 Deployment on Render

### Web Deployment

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure the service:
   - **Name**: your-chat-app-api
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
6. Add environment variables (same as local `.env`)
7. Click "Create Web Service"
