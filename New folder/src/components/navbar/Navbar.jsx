import React from 'react'
import logo from '../../assets/images/logo.svg'
import './navbar.css'


const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="joinWrapper">
        <div className="joinButton createButton">
          <span className='create'>Create Room</span>
        </div>
        <div id="join" className="joinButton">
          <span className='join'>Join Room</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar