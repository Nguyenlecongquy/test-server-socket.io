const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const messages = [];

app.get("/", (req, res) => {
  res.send("hello");
});

io.on("connection", (socket) => {
  const userID = socket.handshake.query.userID;
  console.log(`user ${userID} connected`);

  socket.on("text-message", (data) => {
    const message = data;
    console.log(message);
    messages.push(message);
    io.emit("text-message", message);
  });

  socket.on("image-message", (data) => {
    const message = data;
    console.log(message);
    messages.push(message);
    io.emit("image-message", message);
  });

  socket.on("file-message", (data) => {
    const message = data;
    console.log(message);
    messages.push(message);
    io.emit("file-message", message);
  });

  socket.on("disconnect", () => {
    console.log(`user ${userID} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
