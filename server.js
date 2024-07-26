// Import necessary modules
import http from "http";
import express from "express";
import { Server as SocketIO } from "socket.io";
import cors from "cors";
// Create Express app
const app = express();
app.use(express.json());
app.use(cors());
// Create HTTP server and attach Express app
const server = http.createServer(app);

// Create Socket.IO server and attach it to the HTTP server
const io = new SocketIO(server, {
  cors: { origin: "*" },
});

// Handle WebSocket connections
io.on("connection", (client) => {
  let options = [];
  console.log("A new user has connected:", client.id);
  client.on("question", (data) => {
    console.log(data);
    options = new Array(data.options);
    console.log(options);
    io.emit("test-question", data);
  });
  client.on("sendMessage", (data) => {
    console.log(data);
    io.emit("message", data);
  });
  client.on("submit-answer", (data) => {
    // Process the answer and calculate results
    // This function should return the array of results
    io.emit("poll-results", { results });
  });
  // Handle disconnection
  client.on("disconnect", () => {
    console.log("A user disconnected:", client.id);
  });
});

// Define a basic route
app.get("/", (req, res) => {
  res.status(200).send({
    message: "success",
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server started on port 3000");
});
