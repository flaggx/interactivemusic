import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MusicPlayer from './pages/musicplayer.jsx';
import LoginButton from './components/buttons/login.jsx'
import LogoutButton from './components/buttons/logout.jsx';
import Profile from './components/buttons/profile.jsx';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/music-player">Music Player</Link>
        <LoginButton />
        <LogoutButton />
        <Profile />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music-player" element={<MusicPlayer />} />
      </Routes>
    </div>
  );
};

const Home = () => (
  <div>
    <h2>Welcome to the Home Page</h2>
  </div>
);

export default App;
