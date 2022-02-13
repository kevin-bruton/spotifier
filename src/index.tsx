import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import Home from './components/pages/home/Home';
import reportWebVitals from './reportWebVitals';
import { withRouter }  from './services/withRouter';
import AlbumDetail from './components/pages/album-detail/AlbumDetail';
import ArtistDetail from './components/pages/artist-detail/ArtistDetail';
import TrackDetail from './components/pages/track-detail/TrackDetail';
import { SearchResults } from './components/pages/search-results/SearchResults';
import { setLanguage } from './services/literals';
import { setTheme } from './services/theme';

// Initial language would normmally be gotten from browser settings or user preferences
setLanguage('en');
setTheme('dark');

const ArtistDetailPage = withRouter(ArtistDetail);
const AlbumDetailPage = withRouter(AlbumDetail);
const TrackDetailPage = withRouter(TrackDetail);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="search-results" element={<SearchResults tracks={[]} albums={[]} artists={[]} />} />
          <Route path="album-detail" element={<AlbumDetailPage />} />
          <Route path="artist-detail" element={<ArtistDetailPage />} />
          <Route path="track-detail" element={<TrackDetailPage />} />
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
