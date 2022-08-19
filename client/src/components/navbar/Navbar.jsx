import React from 'react'
import logo from '../../assets/images/logo.svg'
import './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="joinWrapper">
        <Link to="/create-room" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="joinButton createButton">
            <span className='create'>Create Room</span>
          </div>
        </Link>
        <Link to="/join-room" style={{ textDecoration: 'none', color: 'black' }}>
          <div id="join" className="joinButton">
            <span className='join'>Join Room</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar