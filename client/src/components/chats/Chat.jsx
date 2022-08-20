import React, { useEffect } from 'react'

function Chat({ socket, username, roomID, roomName }) {
  const [currentMessage, setCurrentMessage] = React.useState('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: roomID,
        topic: roomName,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      //broadcasting message
      await socket.emit('message', messageData);
      setCurrentMessage('');
    }
  }

  //using useEffect to listen for messages on socket change
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log(data);
    });
  }, [socket])

  return (
    <>
      <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default Chat