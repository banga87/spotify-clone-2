import React, { useState } from 'react'
import Tracklist from './Tracklist'
import '../styles/Playlist.css'


const Playlist = ({ playlistTracks, onRemoveTrack, onChangePlaylistName, onSavePlaylist }) => {

  const [playlistName, setPlaylistName] = useState('');


  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value)
    onChangePlaylistName(playlistName)
  }

  return (
    <div className='playlist'>
      <div className='search-bar'>
        <input
          className='search-input'
          placeholder='Playlist Name'
          onChange={handlePlaylistNameChange}>
        </input>
        <button className='search-button' onClick={()=> onSavePlaylist(playlistName, playlistTracks)} >SAVE TO SPOTIFY</button>
      </div>
      <Tracklist
        tracks={playlistTracks}
        onRemoveTrack={onRemoveTrack}
      />
    </div>
  )
}

export default Playlist