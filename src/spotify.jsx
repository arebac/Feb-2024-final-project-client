// import axios from "axios";

// const authEndpoint = "https://accounts.spotify.com/authorize";
// const clientId = "ecab1e64bbf143e3bfd533905826cb59"; // Typically, variable names are camelCased in JavaScript
// const redirectURI = "http://localhost:5173/"; // Ensure the port number is correctly included
// const responseType = "token";
// const scopes = ["user-library-read", "playlist-read-private"];

// // Function that returns a login link
// // Example export from "../spotify"
// export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${encodeURIComponent(
//   scopes.join(" ")
// )}`;

// const apiClient = axios.create({
//   baseURL: "https://api.spotify.com/v1/",
// });

// export const setClientToken = (token) => {
//   apiClient.interceptors.request.use(async function (config) {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
// };

// export default apiClient;
