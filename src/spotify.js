const authEndpoint = "https://accounts.spotify.com/authorize?";
const ClientID = "ecab1e64bbf143e3bfd533905826cb59";
const redirectURI = "http://localhost/5173";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;


