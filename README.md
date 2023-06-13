# Getting Started with my Spotify Clone

This project was built with HTML, CSS and JavaScript front-end using the React Framework.
To handle Spotify's User Authentication process a simple Express server has been built.

The app does the following:
- Logs into the users Spotify account.
- Allows the user to search for tracks, albumns and/or artists from a single search bar.
- Returns the top 20 results to the user.
- Add/Remove tracks to a playlist below the results.
- Save the playlist to the users Spotify account.

Possibly new features to be added:
- Check existing playlist being saved against existing user playlists of same name.
- Search for an existing playlist / View existing user playlists.
- Add/remove tracks from an existing playlist.
- Delete existing playlist.
- Many more possible features :-)

## How to install and run?

Once downloaded the project will need 2 terminal windows to run correctly.
1. Client side terminal
2. Server side terminal

Run the client side terminal from the project root folder.
<br>
'_npm start_'

CD into the 'server' folder (cd server) in a new terminal and run the below command:
<br>
'_npm run devStart_'
<br>
This is a custom script found in the server folders 'package.json' file.

