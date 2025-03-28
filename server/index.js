import http from "http";
import express from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", socket => {
     socket.on("message", (message)=> {
          console.log("A new message came: ", message);
     })
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res)=> {
     return res.sendFile("./public/index.html");
});

server.listen(8000, ()=> {
     console.log("Server is running on port 8000");
});