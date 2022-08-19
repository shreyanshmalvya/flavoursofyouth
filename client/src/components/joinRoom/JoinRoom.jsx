import React from 'react'
import { Navigate } from 'react-router-dom';

function JoinRoom({socket}) {
  const [roomID, setRoomID] = React.useState('');
  const [navToggle, setNavToggle] = React.useState(false);

  const joinRoom = () => {
    if (roomID !== '') {
      socket.emit('join_room_id', roomID);
      socket.on('room_info', (result) => {
        if (result.message === 'joined room') {
          console.log(result);
          setNavToggle(true);
        } else {
          //show error message
          alert("Room not found");
        }
      }
      );
    }else{
      alert("Please enter a room ID");
    }
  };

  return (
    <div className='createWrapper'>
      <div className="RoomWrapper">
        <div className="Room">
          <div className="RoomInput">
            <input id='RoomTerm' type="text" placeholder="RoomID" onChange={(e) => setRoomID(e.target.value)} />
          </div>
        </div>
      </div >
      <div className="createIcon">
        <div className='createButton' id='createIcon' type="submit" onClick={()=> joinRoom()} >Join</div>
        {
          navToggle ? <Navigate to="/chat" /> : null
        }
      </div >
    </div>
  )
}

export default JoinRoom