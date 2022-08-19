import React from 'react'
import logo from '../../assets/images/logo.svg'
import JoinRoom from "../../components/joinRoom/JoinRoom";
import Navbar from '../../components/navbar/Navbar'

function JoinPage({socket}) {
  return (
    <div className='homeWrapper'>
            <div className='home'>
                <Navbar />
                <div className="hero">
                    <div className="logoWrapper">
                        <img src={logo} alt="logo" />
                    </div>
                    <JoinRoom socket = {socket}/>
                </div>
                <div className="creator">
                    <p>Created by Shreyansh Malviya</p>
                </div>
            </div>
        </div>
  )
}

export default JoinPage;