import React from 'react'
import '../styles/Track.css'

const Track = ({ track, onAddTrack, onRemoveTrack, isInSearchResults }) => {

  const addToPlaylist = (track) => {
    onAddTrack(track);
  }


  const removeTrackFromPlaylist = (track) => {
    onRemoveTrack(track);
  }

  
  return (
    <div className='track'>
      <img src={track.image} alt='' />
      <div className='track-artist-album'>
        <p className='track-album'>{track.name} - {track.album}</p>
        <p className='artist'>{track.artist}</p>
      </div>
      <div className='button'>
        {isInSearchResults ? (
          <button className='add' onClick={()=> addToPlaylist(track)}>ADD</button>
         ) : (
          <button className='remove' onClick={()=> removeTrackFromPlaylist(track)}>REMOVE</button>
         )}
      </div>
    </div>
  )
}

export default Track