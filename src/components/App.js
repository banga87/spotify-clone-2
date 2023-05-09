import Spotify from '../utils/Spotify'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import '../styles/App.css';
import { useCallback, useEffect, useState } from 'react';
import Login from '../new/Login';
import useUserAuth from '../new/UserAuth'
import SpotifyWebApi from 'spotify-web-api-node';


const spotifyApi = new SpotifyWebApi({
  clientId: '1a201c080a09493aaa3b437c6f53dbaf'
})


function App() {
  
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  
  const codeMatch = window.location.href.match(/code=([^&]*)/);
  let code = codeMatch ? codeMatch[1] : null
  let { accessToken } = useUserAuth(code);
  spotifyApi.setAccessToken(accessToken)


  // SET SEARCH RESULTS
  const search = useCallback( async (searchQuery) => {
    // let data = await Spotify.search(searchQuery);
    spotifyApi.searchTracks(searchQuery)
    .then(function(data) {
      console.log(`Search by ${searchQuery}:`);
      let results = data.body.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        image: track.album.images[2].url,
        uri: track.uri
      }))
      setSearchResults(results);
      console.log(searchResults)
    }, function(err) {
      console.error(err);
    });
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
    let playlistId;
    let trackIds = playlistTracks.map(item => item.uri)
    console.log(trackIds)

    // Create Playlist
    spotifyApi.createPlaylist(playlistName, { 'description': playlistName, 'public': true })
    .then(function(data) {
      console.log(data)
      console.log('Playlist ID:', playlistId)
      console.log('Created playlist!')
      return data.body.id
    })
    .then(function(playlistId) {
      return spotifyApi.addTracksToPlaylist(playlistId, trackIds)
    })
    .then(function(data) {
      console.log(data)
    })
    .then(function(error) {
      console.log(error);
    });
  }


  // useEffect(() => {
  //   if(!code) return;
  //   if(accessToken) {
  //     Spotify.setAccessToken(accessToken);
  //   }}, [code]);


  return accessToken ?  (
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
