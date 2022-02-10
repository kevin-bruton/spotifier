import React from 'react';
import './AppBar.scss';
import spotifyBackgroundSvg from '../../../assets/spotify-empathy-logo.svg';

export class AppBar extends React.Component {
  render() {
    return (
      <div className="appbar">
        <img src={spotifyBackgroundSvg} className="appbar__img" alt="Spotify" />
      </div>
    );
  }
}
