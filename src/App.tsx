import React from 'react';
import { /* Link, */ Outlet } from 'react-router-dom';
import './App.scss';
import { SearchQuery } from './models/interfaces';
import { getSearchResults } from './services/api'
import { AppBar } from './components/app-bar/AppBar';
import { SearchBar } from './components/search-bar/SearchBar';
import { SearchResults } from './components/search-results/SearchResults';
import { Track, Album, Artist } from './models/interfaces';

type Props = {};
type State = { tracks: Array<Track>, albums: Array<Album>, artists: Array<Artist> };
export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tracks: [],
      albums: [],
      artists: []
    };
  }

  async onSearchUpdated(searchQuery: SearchQuery) {
    console.log('Search query in app:', searchQuery);
    const queryEmpty = (searchQuery.genQuery === ''
      && searchQuery.advQuery.album === ''
      && searchQuery.advQuery.artist === ''
      && searchQuery.advQuery.track === ''
      && searchQuery.advQuery.year === '');
    if (queryEmpty) {
      this.setState({ tracks: [], albums: [], artists: [] });
    } else {
      const { tracks, albums, artists } = await getSearchResults(searchQuery);
      console.log('Search query results:', { tracks, albums, artists })
      this.setState({ tracks, albums, artists });
    }
  }

  render() {
    return (
      <div className="app__theme--dark">
        <AppBar />
        <SearchBar onSearchUpdated={this.onSearchUpdated.bind(this)}/>
        {/* <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem"
          }}
        >
          <Link to="/artist-detail">Artist Detail</Link> |{" "}
          <Link to="/track-detail">Track Detail</Link> |{" "}
          <Link to="/album-detail">Album Detail</Link>
        </nav> */}
        <Outlet />
        <SearchResults tracks={this.state.tracks} albums={this.state.albums} artists={this.state.artists}/>
        {/* <main style={{ padding: "1rem 0" }}>
          <h2>Search results</h2>
        </main> */}
      </div>
    );
  }
}

export default App;
