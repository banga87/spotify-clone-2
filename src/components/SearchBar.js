import React, { useState } from 'react'
import "../styles/SearchBar.css"

const SearchBar = ({ onSearch, onClearSearchResults }) => {

  const [searchQuery, setSearchQuery] = useState("");

  // Might need to wrap in useCallback()
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Might need to wrap in useCallback()
  const search = () => {
    onSearch(searchQuery);
  }

  const clear = () => {
    onClearSearchResults()
  }


  return (
    <div className='search-bar'>
      <input className='search-input' placeholder='Search for tunes' onChange={handleSearchQueryChange}></input>
      <button className='search-button' onClick={search}>SEARCH</button>
      <button className='clear-button' onClick={clear}>CLEAR</button>

    </div>
  )
}

export default SearchBar