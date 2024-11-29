import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(()=>io("http://localhost:8000"),[]);
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("message", message)
    setMessage("")
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket client connected!", socket.id);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div>
        <p>Welcome to Socket.io</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
