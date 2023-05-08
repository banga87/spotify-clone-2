import React from 'react'
import Tracklist from './Tracklist'
import '../styles/SearchResults.css'

const SearchResults = ({ searchResults, onAddTrack }) => {


  return (
    <div className='search-results'>
      <Tracklist
        tracks={searchResults}
        onAddTrack={onAddTrack}
        isInSearchResults={true}
      />
    </div>
  )
}

export default SearchResults