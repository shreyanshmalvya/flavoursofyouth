import React from 'react'
import logo from '../../assets/images/logo.svg'
import Chat from '../../components/chats/Chat'
import Navbar from '../../components/navbar/Navbar'

function ChatPage({socket}) {
  return (
    <div className='homeWrapper'>
            <div className='home'>
                <Navbar />
                <div className="hero">
                    <div className="logoWrapper">
                        <img src={logo} alt="logo" />
                    </div>
                    <Chat socket = {socket}/>
                </div>
                <div className="creator">
                    <p>Created by Shreyansh Malviya</p>
                </div>
            </div>
        </div>
  )
}

export default ChatPage;