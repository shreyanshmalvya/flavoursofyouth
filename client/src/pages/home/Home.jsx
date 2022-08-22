import React, { useState } from 'react'
import './home.css'
import logo from '../../assets/images/logo.svg'
import Navbar from '../../components/navbar/Navbar';
import Search from '../../components/search/Search';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch } from 'react-redux';
import { incrementByAmount } from '../../redux/username';

function Home({ socket }) {
    const [open, setOpen] = useState(true);
    const [username, setUsername] = useState('');

    const onCloseModal = () => setOpen(false);
    
    const dispatch = useDispatch();
    const updateUsername = () => {
        dispatch(incrementByAmount(username));
    }
    
    return (
        <>
            <div>
                {/* <button onClick={(e) => onOpenModal()}></button> */}
                <div className="modal">
                    <Modal className='modal' open={open} onClose={onCloseModal} closeOnEsc={false} closeOnOverlayClick ={false} blockScroll={false} showCloseIcon={false} center>
                        <div className="searchWrapper">
                            <div className="search">
                                <div className="searchInput">
                                    <input id='searchTerm' type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="searchIcon">
                                    <div className='searchButton' id='searchIcon' type="submit" onClick={() => { onCloseModal(); updateUsername() }}>Submit</div>
                                </div>
                            </div>
                        </div >
                    </Modal>
                </div>
            </div>
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
        </>
    );
};

export default Home