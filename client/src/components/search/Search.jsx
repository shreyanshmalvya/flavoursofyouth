import React from 'react'
import './search.css'
import { Navigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { incrementByAmount } from '../../redux/roomData';

const Search = ({ socket }) => {
    //declaring states for search
    const [query, setQuery] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([]);
    const [chatToggle, setChatToggle] = React.useState(false);

    //initalizing redux state
    const dispatch = useDispatch();
    
    //functiopn to pass RommName and RoomID into store
    const roomData = (Name, ID) => {
        dispatch(incrementByAmount({name: Name, id: ID}));
        console.log("here")
    };

    //storing the value of the search input in the state
    const searchHandler = (e) => {
        //searching for the room
        socket.emit("search_room", query);
        socket.on("room_data", (data) => {
            if (data.room !== null) {
                setSearchResults(data.room);
                console.log(data);
            } else {
                setSearchResults([{ name: "No results found", description: "no entry for the given topic" }]);
            }
        });
    };

    //joining the room from list of search results
    const joinRoomList = (data) => {
        console.log(data);
        //add redux states for name and roomID
        socket.emit("join_room_id", data);
        socket.on("room_info", (data) => {
            if (data.message === "joined room") {
                console.log(data);
                setChatToggle(true);
            } else {
                //show error message
                alert("Room not found");
            }
        });
    };

    return (
        <>
            <div className="searchWrapper">
                <div className="search">
                    <div className="searchInput">
                        <input id='searchTerm' type="text" placeholder="Search for topics" onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <div className="searchIcon">
                        <div className='searchButton' id='searchIcon' type="submit" onClick={(e) => searchHandler(e)}>Search</div>
                    </div>
                </div>
            </div >
            <div className="optionChat">
                <div className="optionWrappers">
                    Wanna create a room for a new topic?&nbsp;
                    <Link to="/create-room" style={{ textDecoration: 'none', color: 'black' }}>
                        <span className='onclickbtn'>Create Room </span>
                    </Link>
                    &nbsp; or &nbsp;
                    <Link to="/join-room" style={{ textDecoration: 'none', color: 'black' }}>
                        <span className='onclickbtn'> Join Room</span>
                    </Link>
                </div>
                <div className="notice">
                    <span>
                        *use the create room option for private rooms
                    </span>
                </div>
            </div>
            <div className="searchResults">
                {searchResults.map((result, key) => {
                    return (
                        //return data in leaflet from
                        <div className="resultWrapper" key={key}>
                            <div className="searchResult" >
                                <div className="searchResultTitle">
                                    {result.name}
                                </div>
                                <div className="searchResultDescription" >
                                    {result.description}
                                </div>
                                <div className="readOption" onClick={() => { joinRoomList(result._id); roomData(result.name, result._id) }}>
                                    Join
                                </div>
                                {
                                    chatToggle ? <Navigate to="/chat" /> : null
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Search