import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SearchTrack from "./pages/SearchTrack";
import Playlists from "./pages/Playlists";
import AllPlaylists from "./pages/AllPlaylists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Home from "./screens/Home";
import "./home.css";
import Sidebar from "./components/sidebar/Sidebar";
import "./shared/globalStyles.css"

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="main-body">
      
      <Sidebar/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/search-track" element={<SearchTrack />} />
        <Route path="/user-playlists" element={<Playlists />} />
        <Route path="/playlists" element={<AllPlaylists />} />
        <Route path="/playlists/:playlistId" element={<PlaylistDetails />} />
 
       
 
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
     
      </Routes>
      {/* <Home />   */}
    </div>
  );
}

export default App;
