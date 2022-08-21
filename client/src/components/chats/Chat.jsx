import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function Chat({ socket, username }) {
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [messageList, setMessageList] = React.useState([]);

  const roomName = useSelector(state => state.roomData.roomData.name);
  const roomID = (useSelector(state => state.roomData.roomData.id));


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
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  }



  // using useEffect to listen for messages on socket change
  useEffect(() => {
    socket.on("recieved_message", (data) => {
      console.log("in recive", data)
      setMessageList((list) => [...list, data]);
    });
  }, [socket])

  return (
    <>
      <div className="chatWrapper">
        {messageList.map((message, key) => {
          return (
            <div className="chatMessage" key = {key}>
              <div className="chatAuthor">{message.author}</div>
              <div className="chatMessageText">{message.message}</div>
              <div className="chatTime">{message.time}</div>
            </div>
          )
        })}
      </div>
      <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default Chat