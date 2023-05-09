import axios from 'axios';

const clientID = "1a201c080a09493aaa3b437c6f53dbaf";
const redirectURL = "http://localhost:3000/";
const baseURL = "https://accounts.spotify.com/authorize";

let accessToken;
let tokenExpirationTime;
// let code;


const Spotify = {

  getAccessToken() {
    const currentTime = new Date().getTime();

    if (accessToken && currentTime < tokenExpirationTime) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    // code = window.location.href.match(/code=([^&]*)/)
    
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      tokenExpirationTime = currentTime + expiresIn * 1000;

      window.setTimeout(() => {
      accessToken = '';
      tokenExpirationTime = 0;
    }, expiresIn * 1000);

      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {


      const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
      const encodedScopes = encodeURIComponent(scopes);

      const accessURL = `${baseURL}?client_id=${clientID}&response_type=token&scope=${encodedScopes}&redirect_uri=${encodeURIComponent(redirectURL)}`;
      window.location = accessURL;

    }
  },

  logout() {
    accessToken = ''
    tokenExpirationTime = null;
    console.log('Access Token:', accessToken)
  },

  async search(query) {
    const accessToken = Spotify.getAccessToken();
    
    const { data } = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }})
    // console.log("Raw Tracks:", data.tracks.items)
    return data.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[2].url,
      uri: track.uri
    }));
  },


  async save(playlistName, playlistTracks) {
    // const accessToken = Spotify.getAccessToken();

    // Collect currentUserData and save currentUserID
    const { data: currentUserData } = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
    }})
    const currentUserId = currentUserData.id;
    console.log("Current User ID:", currentUserId)

    // Save playlist
    const { data: playlistData } = await axios.post(`https://api.spotify.com/v1/users/${currentUserId}/playlists`, {
      "name": playlistName,
      "description": playlistName,
      "public": "true",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
    })

    // const currentUserID = currentUserData.id;
    console.log("Playlist Data", playlistData)
  }
}

export default Spotify;