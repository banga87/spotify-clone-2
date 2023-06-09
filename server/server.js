require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node');
const PORT = process.env.PORT || 3001;

const app = express();

var corsOptions = {
  origin: ['https://angus-spotify-clone.netlify.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret =  process.env.REACT_APP_CLIENT_SECRET;

// REFRESH ENDPOINT
app.post('/refresh', (request, response) => {
  const refreshToken = request.body.refreshToken;
  console.log('REFRESH:', refreshToken)
  const spotifyApi = new SpotifyWebApi({
    redirectUri : process.env.REACT_APP_REDIRECT_URI,
    clientId : process.env.REACT_APP_CLIENT_ID,
    clientSecret :  process.env.REACT_APP_CLIENT_SECRET,
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
    redirectUri : process.env.REACT_APP_REDIRECT_URI,
    clientId : process.env.REACT_APP_CLIENT_ID,
    clientSecret :  process.env.REACT_APP_CLIENT_SECRET,
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log('The token expires in: ' + data.body['expires_in'])
      console.log('The access token is: ' + data.body['access_token']);
      console.log('The refresh token is: ' + data.body['refresh_token']);
      console.log('The authorization code is:', code)
      
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
      console.log(error.message)
      console.log(error.stack)
      response.sendStatus(400)
    })
});

// app.listen(3001);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});