// Install dependencies: npm install express socket.io cors
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// Sample resource data (replace with NDMA API fetch)
let resources = [
  { name: "Community Shelter", type: "Shelter", status: "Immediate", contact: "123-456-7890", lat: 28.6139, lng: 77.2090, color: "green" },
  { name: "Central Medical Camp", type: "Medical", status: "Limited", contact: "987-654-3210", lat: 28.6200, lng: 77.2300, color: "yellow" },
  { name: "Relief Food Distribution", type: "Food", status: "Ongoing", contact: "555-555-5555", lat: 28.6400, lng: 77.2500, color: "blue" }
];

app.get("/api/resources", (req, res) => {
  res.json(resources);
});

// Socket.IO for live chat
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
