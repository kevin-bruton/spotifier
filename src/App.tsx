import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div>
      <h1>Spotify search</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/artist-detail">Artist Detail</Link> |{" "}
        <Link to="/track-detail">Track Detail</Link> |{" "}
        <Link to="/album-detail">Album Detail</Link>
      </nav>
      <Outlet />
      <main style={{ padding: "1rem 0" }}>
        <h2>Search results</h2>
      </main>
    </div>
  );
}

export default App;
