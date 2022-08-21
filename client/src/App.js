import './App.css';
import io from 'socket.io-client'
import React from 'react';
import Home from './pages/home/Home';
import CreateRoomPage from './pages/createRoom/CreateRoomPage';
import JoinPage from './pages/joinRoom/JoinPage';
import Chatpage from './pages/chat/Chatpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux';

//estblishing connection with web socket
const socket = io.connect('http://localhost:8080');

function App() {
  const roomName = useSelector(state => state.roomData.roomName);
  const roomID = useSelector(state => state.roomData.roomID);
  console.table(roomName, roomID);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/create-room" element={<CreateRoomPage socket={socket} />} />
          <Route path="/join-room" element={<JoinPage socket={socket} />} />
          <Route path="/chat" element={<Chatpage socket={socket} roomName={roomName} roomID = {roomID}/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
