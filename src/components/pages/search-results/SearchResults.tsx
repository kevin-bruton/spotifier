import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.scss';
import { ItemCard } from '../../organisms/item-card/ItemCard';
import { Track, Album, Artist } from '../../../models/interfaces';
import { t } from '../../../services/literals';

type Props = { tracks: Array<Track>, albums: Array<Album>, artists: Array<Artist> };

export class SearchResults extends React.Component<Props, {}> {
  render() {
    const { tracks = [], albums = [], artists = [] } = this.props;
    const numColumns = (tracks.length ? 1 : 0)
      + (albums.length ? 1 : 0)
      + (artists.length ? 1 : 0);
    return (
      <div className={`searchresults searchresults__col-${numColumns}`}>
        {tracks.length
          ? <div className="searchresults__category">
              <div className="searchresults__title">{t('mediatype_track').toUpperCase()}</div>
              <div className="searchresults__items">
                {tracks.map((track: Track, i: number) =>
                  <Link key={track.id} state={track} to="/track-detail" className="searchresults__link"><ItemCard title={track.name} subtitle={track.artist} imageurl={track.imageUrl} /></Link>
                )}
              </div>
            </div>
          : ''}
        {albums.length
          ? <div className="searchresults__category">
              <div className="searchresults__title">{t('mediatype_album').toUpperCase()}</div>
              <div className="searchresults__items">
                {albums.map((album: Album, i: number) =>
                  <Link key={album.id} state={album} to="/album-detail" className="searchresults__link"><ItemCard title={album.name} subtitle={album.artist} imageurl={album.imageUrl} /></Link>
                )}
              </div>
            </div>
          : ''}
        {artists.length
          ? <div className="searchresults__category">
              <div className="searchresults__title">{t('mediatype_artist').toUpperCase()}</div>
              <div className="searchresults__items">
                {artists.map((artist: Artist, i: number) =>
                  <Link key={artist.id} state={artist} to="/artist-detail" className="searchresults__link"><ItemCard key={i} title={artist.name} subtitle="" imageurl={artist.imageUrl} /></Link>
                )}
              </div>
            </div>
          : ''}
      </div>
    );
  }
}
