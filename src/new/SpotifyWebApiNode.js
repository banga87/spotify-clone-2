const clientID = "1a201c080a09493aaa3b437c6f53dbaf";
const clientSecret = "4df850aef857400082f5cfb20555e650";
const redirectURL = "http://localhost:3000/";
const baseURL = "https://accounts.spotify.com/authorize";

const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
const state = 'code';

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: clientID,
  clientSecret: clientSecret,
  redirectUri: redirectURL
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

console.log(authorizeURL);

window.href.location(authorizeURL);

var code = window.location.href.match(/code=([^&]*)/);

spotifyApi.authorizationCodeGrant(code).then(
  function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    // spotifyApi.setAccessToken(data.body['access_token']);
    // spotifyApi.setRefreshToken(data.body['refresh_token']);
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);