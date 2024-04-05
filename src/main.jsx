import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context.jsx";
import { PlaylistProvider } from "./context/playlists.context.jsx";
// import { CookiesProvider } from "react-cookie";

import * as bootstrap from "bootstrap";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>


        <AuthProvider>
          <PlaylistProvider>
            <App />
          </PlaylistProvider>
        </AuthProvider>


    </BrowserRouter>
  </React.StrictMode>
);
