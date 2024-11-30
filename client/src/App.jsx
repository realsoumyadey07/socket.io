import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(()=>io("http://localhost:8000"),[]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const[roomName, setRoomName] = useState("");
  console.log(messages);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("message", {message, room})
    setMessage("")
  };
  const joinRoomHandler = (e)=> {
    e.preventDefault();
    socket.emit("join-room", roomName);
  }
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socketId.id);
      console.log("Socket client connected!", socket.id);
    });
    socket.on("receive-message", (data)=> {
      console.log(data);
      setMessages(messages=> [...messages, data]);
    })
    socket.on("welcome", (s) => {
      console.log(s);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh">
      <div className="text-3xl font-semibold mb-6">
        <p>Welcome to Socket.io</p>
      </div>
      <p className="text-xl mb-4 font-semibold">Your socket id is: {socket.id}</p>
      <form onSubmit={joinRoomHandler} className="flex items-center gap-3 mb-6">
        <h2 className="font-semibold">Join Room :</h2>
        <input 
        type="text" 
        className="border-2 rounded-md w-[250px] py-2 px-4"
        placeholder="Enter your room name here..."
        name="roomName"
        value={roomName}
        onChange={e=> setRoomName(e.target.value)}
         />
         <button className="bg-slate-200 px-2 py-3 rounded-md text-gray-600 font-semibold hover:bg-slate-300 hover:ease-in-out shadow-md" type="submit">Join</button>
      </form>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          name="message"
          id="message"
          className="border-2 py-2 px-4 rounded-md w-[250px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <input 
        type="text"
        name="room"
        className="border-2 py-2 px-4 rounded-md w-[250px]"
        value={room}
        onChange={e=> setRoom(e.target.value)}
        placeholder="Enter the the room id here..."
         />
        <button type="submit" className="bg-slate-200 px-2 rounded-md text-gray-600 font-semibold hover:bg-slate-300 hover:ease-in-out shadow-md">Send</button>
      </form>
      <div>
        {messages.map((m, i)=> (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
