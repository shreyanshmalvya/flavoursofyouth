import React from 'react'
import './home.css'
import logo from '../../assets/images/logo.svg'
import Navbar from '../../components/navbar/Navbar';
import Search from '../../components/search/Search';


function Home({socket}) {
    return (
        <div className='homeWrapper'>
            <div className='home'>
                <Navbar />
                <div className="hero">
                    <div className="logoWrapper">
                        <img src={logo} alt="logo" />
                    </div>
                    <Search socket={socket} />
                </div>
                <div className="creator">
                    <p>Created by Shreyansh Malviya</p>
                </div>
            </div>
        </div>
    );
}

export default Home