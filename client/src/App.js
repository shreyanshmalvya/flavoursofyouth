import './App.css';
import io from 'socket.io-client'
import React from 'react';
import Home from './pages/home/Home';
import CreateRoomPage from './pages/createRoom/CreateRoomPage';
import JoinPage from './pages/joinRoom/JoinPage';
import Chatpage from './pages/chat/Chatpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//estblishing connection with web socket
const socket = io.connect('http://localhost:8080');

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/create-room" element={<CreateRoomPage socket={socket} />} />
          <Route path="/join-room" element={<JoinPage socket={socket} />} />
          <Route path="/chat" element={<Chatpage socket={socket}/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
