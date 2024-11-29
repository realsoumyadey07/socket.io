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
  
  socket.on("message", (data)=> {
     console.log(data)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
