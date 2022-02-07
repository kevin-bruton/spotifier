import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.scss';
import { ItemCard } from '../item-card/ItemCard';
import { Track, Album, Artist } from '../../models/interfaces';

type Props = { tracks: Array<Track>, albums: Array<Album>, artists: Array<Artist> };

export class SearchResults extends React.Component<Props, {}> {
  render() {
    console.log('Tracks. Defined:', !!this.props.tracks, 'Length:', this.props.tracks?.length)
    console.log('Albums. Defined:', !!this.props.albums, 'Length:', this.props.albums?.length)
    console.log('Artists. Defined:', !!this.props.artists, 'Length:', this.props.artists?.length)
    const { tracks = [], albums = [], artists = [] } = this.props;
    const numColumns = (tracks.length ? 1 : 0)
      + (albums.length ? 1 : 0)
      + (artists.length ? 1 : 0);
    return (
      <div className={`searchresults searchresults__col-${numColumns}`}>
        {tracks.length
          ? <div className="searchresults__category">
              <div className="searchresults__title">TRACKS</div>
              <div className="searchresults__items">
                {tracks.map((track: Track, i: number) =>
                  <Link to="/track-detail"><ItemCard key={i} title={track.name} subtitle={track.artist} imageurl={track.imageUrl} /></Link>
                )}
              </div>
            </div>
          : ''}
        {albums.length
          ? <div className="searchresults__category">
              <div className="searchresults__title">ALBUMS</div>
              <div className="searchresults__items">
                {albums.map((album: Album, i: number) =>
                  <ItemCard key={i} title={album.name} subtitle={album.artist} imageurl={album.imageUrl} />
                )}
              </div>
            </div>
          : ''}
        {artists.length
          ? <div className="searchresults__category">
              <div className="searchresults__title">ARTISTS</div>
              <div className="searchresults__items">
                {artists.map((artist: Artist, i: number) =>
                  <ItemCard key={i} title={artist.name} subtitle="" imageurl={artist.imageUrl} />
                )}
              </div>
            </div>
          : ''}
      </div>
    );
  }
}
