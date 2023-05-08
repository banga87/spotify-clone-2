import React from 'react'
import '../styles/Tracklist.css';
import Track from './Track';

const Tracklist = ({ tracks, onAddTrack, onRemoveTrack, isInSearchResults}) => {



  return (
    <div className='tracklist'>
      {tracks.map((track) => {
        return <Track
          key={track.id}
          track={track}
          onAddTrack={onAddTrack}
          onRemoveTrack={onRemoveTrack}
          isInSearchResults={isInSearchResults}
        />
      })}
    </div>
  )
}

export default Tracklist