import React from 'react'

const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
const encodedScopes = encodeURIComponent(scopes);
const clientID = "1a201c080a09493aaa3b437c6f53dbaf";
const redirectURL = "https://angus-spotify-clone.netlify.app/callback";
// const redirectURL = "http://localhost:3000/";
const baseURL = "https://accounts.spotify.com/authorize";

const AUTH_URL = `${baseURL}?client_id=${clientID}&response_type=code&scope=${encodedScopes}&redirect_uri=${encodeURIComponent(redirectURL)}`;


const handleClick = () => {
  console.log("AUTH URL:", AUTH_URL)
  window.location.href = AUTH_URL;
}

const Login = () => {
  return (
    <div>
      <button onClick={handleClick}>Login with Spotify</button>
    </div>
  )
}

export default Login