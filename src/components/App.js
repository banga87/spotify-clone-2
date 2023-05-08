import '../styles/App.css';
import Spotify from '../utils/Spotify'
import { useCallback, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Login from './Login';
import UserAuth from './UserAuth'



function App() {
  
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  
  const code = new URLSearchParams(window.location.search).get('code')
  const accessToken = UserAuth(code)


  const initializeSpotifyAuth = () => {
    Spotify.getAccessToken();
  };


  // SET SEARCH RESULTS
  const search = useCallback( async (searchQuery) => {
    let data = await Spotify.search(searchQuery);
    setSearchResults(data);
  }, []);


  // ADD TRACK TO PLAYLIST
  const addTrack = (track) => {
    if (playlistTracks.some((playlistTrack) => playlistTrack.id === track.id)
    ) {
      return;
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }


  // REMOVE TRACK FROM PLAYLIST
  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) => {
      return prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    })
  }


  // CHANGE PLAYLIST NAME
  const changePlaylistName = (name) => {
    setPlaylistName(name)
  }


  // SAVE PLAYLIST
  const savePlaylist = async (playlistName, playlistTracks) => {
    await Spotify.save(playlistName, playlistTracks)
  }




  return code ?  (
    <div className="App">
      <h1>Spotify-Clone</h1>
      <SearchBar onSearch={search}/>
      <SearchResults
        searchResults={searchResults}
        onAddTrack={addTrack}  
      />
      <Playlist 
        playlistTracks={playlistTracks}
        onRemoveTrack={removeTrack}
        onChangePlaylistName={changePlaylistName}
        onSavePlaylist={savePlaylist}
      />
    </div>
  ) : (
    <div className='App'>
      <Login />
    </div>
  )
}

export default App;
