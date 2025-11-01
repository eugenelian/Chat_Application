import { Server } from "socket.io";
import http from "http";
import express from "express";

// Create express app and server running on top of app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Function to return the socketId from userId
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Sets up a socket mapping for online users {userId: socketId}
const userSocketMap = {};

// Listen for connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Update Socket Map
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Broadcast to all connected users that
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    // Delete user from Socket Map and broadcast to all online users
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
