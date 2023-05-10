import SpotifyWebApi from 'spotify-web-api-node'

// Initialize spotifyApi outside the function to be used across multiple functions
const spotifyApi = new SpotifyWebApi({
  clientId: '1a201c080a09493aaa3b437c6f53dbaf',
});

const setAccessToken = (token) => {
  spotifyApi.setAccessToken(token);
}

const searchTracks = async (searchQuery) => {
  const data = await spotifyApi.searchTracks(searchQuery);
  console.log(data.body)
  return data.body.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    image: track.album.images[2].url,
    uri: track.uri
  }))
}

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

const spotify = {
  setAccessToken,
  searchTracks,
  savePlaylist,
};

export default spotify
