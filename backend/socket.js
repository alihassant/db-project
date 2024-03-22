const { Server } = require("socket.io");

let io;
const userSocketArray = []; // Array to store user IDs and socket IDs

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
      },
    });

    // Handle user connections
    io.on("connection", (socket) => {
      console.log("Client connected!");

      // Handle when a user connects
      socket.on("userId", (userId) => {
        // Store the userId and socketId
        userSocketArray.push({ userId, socketId: socket.id });
        io.to(socket.id).emit("notification", {
          message: "You are connected",
        });
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("Client disconnected!");
        // Remove the entry for the disconnected socket
        const index = userSocketArray.findIndex(
          (entry) => entry.socketId === socket.id
        );
        if (index !== -1) {
          userSocketArray.splice(index, 1);
        }
      });
    });

    if (!io) {
      throw new Error("Socket.io not initialized");
    }

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },

  // Method to emit a toast notification to a specific user
  emitToUser: (userId, event, data) => {
    if (!userId) return console.log("No userId provided");
    userSocketArray.forEach((entry) => {
      if (entry.userId === userId) {
        io.to(entry.socketId).emit(event, data);
        // console.log(`Notification emitted to user ${userId}:`, data); // Add this log statement
      }
      // else {
      //   console.log(`User ${userId} not connected`);
      // }
    });
  },
};
