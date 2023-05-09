require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const redirectUri = process.env.REDIRECT_URI;
const clientId = process.env.CLIENT_ID;
const clientSecret =  process.env.CLIENT_SECRET;

// REFRESH ENDPOINT
app.post('/refresh', (request, response) => {
  const refreshToken = request.body.refreshToken;
  console.log('REFRESH:', refreshToken)
  const spotifyApi = new SpotifyWebApi({
    redirectUri : process.env.REDIRECT_URI,
    clientId : process.env.CLIENT_ID,
    clientSecret :  process.env.CLIENT_SECRET,
    refreshToken,
  })
  
  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      response.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn
      })   
    })
    .catch((error) => {
      // console.log(error)
      // response.sendStatus(400)
    });
})


// LOGIN ENDPOINT
app.post('/login', (request, response) => {
  const code = request.body.code
  console.log('Login endpoint called with code:', code)
  const spotifyApi = new SpotifyWebApi({ 
    redirectUri : process.env.REDIRECT_URI,
    clientId : process.env.CLIENT_ID,
    clientSecret :  process.env.CLIENT_SECRET,
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      // console.log('The token expires in: ' + data.body['expires_in'])
      // console.log('The access token is: ' + data.body['access_token']);
      // console.log('The refresh token is: ' + data.body['refresh_token']);
      // console.log('The authorization code is:', code)
      
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);

      response.json({
        accessToken : data.body['access_token'],
        refreshToken : data.body['refresh_token'],
        expiresIn : data.body['expires_in'],
      })
      console.log('AuthorizationCodeGrant SUCCESS')
    })
    .catch((error) => {
      console.log(error)
      response.sendStatus(400)
    })
});

app.listen(3001);