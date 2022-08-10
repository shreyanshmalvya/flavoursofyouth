import React from 'react'
// import axios from 'axios';
import './search.css'


const Search = () => {
    //declaring states
    const [query, setQuery] = React.useState('')
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);

    //storing the value of the search input in the state
    const searchHandler = (e) => {
        setSearch(query);
        console.log(search)
    };
    //new comment

    return (
        <>
            <div className="searchWrapper">
                <div className="search">
                    <div className="searchInput">
                        <input id='searchTerm' type="text" placeholder="Search for topics" onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <div className="searchIcon">
                        <div className='searchButton' id='searchIcon' type="submit" onClick={() => searchHandler()}>Search</div>
                    </div>
                </div>
            </div >
            <div className="optionChat">
                Wanna create a room for a new topic? Create Room
            </div>
            <div className="searchResults">
                {/* {searchResults.map((result, key) => {
                    return (
                        //return data in leaflet from
                        <div className="resultWrapper" key={key}>
                            <div className="searchResult" >
                                <div className="searchResultTitle">
                                    {result.title}
                                </div>
                                <div className="searchResultDescription" >
                                    {result.description}
                                </div>
                                <div className="readOption" onClick={() => {}}>
                                </div>
                            </div>
                        </div>
                    );
                })} */}
            </div>
        </>
    )
}

export default Search