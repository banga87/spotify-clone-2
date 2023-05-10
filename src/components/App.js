import Spotify from '../utils/Spotify';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import '../styles/App.css';
import { useCallback, useEffect, useState } from 'react';
import Login from './Login';
import useUserAuth from './UserAuth'


function App() {

  
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  
  const codeMatch = window.location.href.match(/code=([^&]*)/);
  let code = codeMatch ? codeMatch[1] : null
  let { accessToken } = useUserAuth(code);


  useEffect(() => {
    if (accessToken) {
      Spotify.setAccessToken(accessToken)
    }
  }, [accessToken])


  // SET SEARCH RESULTS
  const search = async (searchQuery) => {
    const results = await Spotify.searchTracks(searchQuery)
    setSearchResults(results)
  }

  const clearSearchResults = () => {
    setSearchResults([])
  }

  
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
  
  
  // SAVE PLAYLIST
  const savePlaylist = async (playlistName, playlistTracks) => {
    Spotify.savePlaylist(playlistName, playlistTracks)
  }


  // CHANGE PLAYLIST NAME
  const changePlaylistName = (name) => {
    setPlaylistName(name)
  }


  // useEffect(() => {
  //   if(!code) return;
  //   if(accessToken) {
  //     Spotify.setAccessToken(accessToken);
  //   }}, [code]);


  return accessToken ?  (
    <div className="App">
      <h1>Spotify-Clone</h1>
      <SearchBar
        onSearch={search}
        onClearSearchResults={clearSearchResults}  
      />
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
