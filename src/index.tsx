import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AlbumDetail from './routes/album-detail';
import ArtistDetail from './routes/artist-detail';
import TrackDetail from './routes/track-detail';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
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
