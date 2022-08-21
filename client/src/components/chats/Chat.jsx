import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import './chat.css'
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket }) {
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [messageList, setMessageList] = React.useState([]);

  const roomName = useSelector(state => state.roomData.roomData.name);
  const roomID = (useSelector(state => state.roomData.roomData.id));
  const user = useSelector(state => state.username.username);


  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: roomID,
        topic: roomName,
        author: user,
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
    <div className='chat'>
      <div className="wrap">
        <div className="chatHeader">
          <div className="chatHeaderText">
             <span>Topic :</span>  {roomName}
          </div>
        </div>
        <div className="chatWrapper">
          <ScrollToBottom className='messageContainer'>
          {messageList.map((message, key) => {
            return (
              <div className={user === message.author ? "you " : "other"} key={key}>
                <div className="chatMessage">
                  <div className="chatMessageText">{message.message}</div>
                  <div className="messageAlignWrapper">
                    <div className="chatAuthor">{message.author},</div>
                    <div className="chatTime">{message.time}</div>
                  </div>
                </div>
              </div>
            )
          })}
          </ScrollToBottom>
        </div>
        <div className="chatFooter">
          <div className="searchWrapper">
            <div className="search">
              <div className="searchInput">
                <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyPress={(event) => {
                  event.key === 'Enter' && sendMessage();
                }} />
              </div>
              <div className="searchIcon chatfooter" onClick={sendMessage}>
                SEND
              </div>
            </div>
          </div >
        </div>
      </div>
    </div>
  )
}

export default Chat