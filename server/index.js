import http from "http";
import express from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve("./public")));


io.on("connection", socket => {
     socket.on("message", (message)=> {
          console.log("A new message came: ", message);
          io.emit("message", message);
     });
});


app.get("/", (req, res)=> {
     return res.sendFile("./public/index.html");
});

server.listen(8000, ()=> {
     console.log("Server is running on port 8000");
});