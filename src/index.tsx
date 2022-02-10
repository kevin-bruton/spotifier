import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import Home from './components/pages/home/Home';
import reportWebVitals from './reportWebVitals';
import AlbumDetail from './components/pages/album-detail/AlbumDetail';
import ArtistDetail from './components/pages/artist-detail/ArtistDetail';
import TrackDetail from './components/pages/track-detail/TrackDetail';
import { SearchResults } from './components/pages/search-results/SearchResults';
import { setLanguage } from './services/literals';

// Initial language would normmally be gotten from browser settings or user preferences
setLanguage('en');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="search-results" element={<SearchResults tracks={[]} albums={[]} artists={[]} />} />
          <Route path="album-detail" element={<AlbumDetail />} />
          <Route path="artist-detail" element={<ArtistDetail />} />
          <Route path="track-detail" element={<TrackDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
