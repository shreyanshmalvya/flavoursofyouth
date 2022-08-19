import React, { useEffect } from 'react'
import "./createRoom.css";
import { Navigate } from 'react-router-dom';

function CreateRoom({ socket }) {
  const [roomName, setRoomName] = React.useState('');
  const [roomDescription, setRoomDescription] = React.useState('');
  const [data, setData] = React.useState({
    username: '',
    roomName: '',
    roomDescription: '',
  });
  const [redirectToggle, setRedirectToggle] = React.useState(false);

 
  useEffect(() => {
    const setRoomData = () => {
      if (roomName !== '' || roomDescription !== '') {
        setData({
          roomName: roomName,
          roomDescription: roomDescription,
        });
      }
    }
    setRoomData();
  }, [roomName, roomDescription]);

  //creating data for the room
  const createRoom = () => {
    if (data.roomName !== '' && data.roomDescription !== '') {
      console.table({ data })
      socket.emit('create_room', data);
      socket.on('room_created', (result) => {
        if (result.message === true) {
          console.log('room created');
          setRedirectToggle(true);
        } else {
          //show error message
          alert("Room not created, try again");
        }
      }
      );
    }
  };

  // creating the room via sockets

  return (
    <div className='createWrapper'>
      <div className="RoomWrapper">
        <div className="Room">
          <div className="RoomInput">
            <input id='RoomTerm' type="text" placeholder="Topic for Room" onChange={(e) => setRoomName(e.target.value)} />
          </div>
        </div>
      </div >
      <div className="RoomWrapper">
        <div className="Room">
          <div className="RoomInput">
            <input id='RoomTerm' type="text" placeholder="Room Description" onChange={(e) => setRoomDescription(e.target.value)} />
          </div>
        </div>
      </div >
      <div className="createIcon">
        <div className='createButton' id='createIcon' type="submit" onClick={createRoom} >create</div>
        {
          redirectToggle ? <Navigate to="/chat" /> : null
        }
      </div >
    </div>
  )
}

export default CreateRoom;