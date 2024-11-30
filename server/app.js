import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const port = 8000;

const app = express();
const server = createServer(app);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

io.on("connection", (socket) => {
  console.log("User connected!");
  console.log("Id", socket.id);
  
  socket.on("message", ({room, message})=> {
     console.log({room, message})
     io.to(room).emit("receive-message", message)
  })
 
  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
