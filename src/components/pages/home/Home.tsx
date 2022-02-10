import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { withRouter, WithRouterProps } from '../../../services/withRouter';
import './Home.scss';
import { SearchQuery } from '../../../models/interfaces';
import { getSearchResults } from '../../../services/api'
import { AppBar } from '../../organisms/app-bar/AppBar';
import { SearchBar } from '../../organisms/search-bar/SearchBar';
import { SearchResults } from '../search-results/SearchResults';
import { Track, Album, Artist } from '../../../models/interfaces';

type Props = WithRouterProps<{}>;
type State = { tracks: Array<Track>, albums: Array<Album>, artists: Array<Artist> };

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tracks: [],
      albums: [],
      artists: []
    };
  }

  async onSearchUpdated(searchQuery: SearchQuery) {
    const queryEmpty = (searchQuery.genQuery === ''
      && searchQuery.advQuery.album === ''
      && searchQuery.advQuery.artist === ''
      && searchQuery.advQuery.track === ''
      && searchQuery.advQuery.year === ''
      && searchQuery.advQuery.genre === '');
    if (queryEmpty) {
      this.setState({ tracks: [], albums: [], artists: [] });
    } else {
      const { tracks, albums, artists } = await getSearchResults(searchQuery);
      this.setState({ tracks, albums, artists });
    }
  }

  render() {
    const pathname = window.location.pathname;

    return (
      <div className="app__theme--dark">
        <AppBar />
        <Outlet />
        {pathname === '/'
          ? <div>
              <SearchBar onSearchUpdated={this.onSearchUpdated.bind(this)}/>
              <SearchResults tracks={this.state.tracks} albums={this.state.albums} artists={this.state.artists}/>
            </div>
          : ''
        }
      </div>
    );
  }
}

export default withRouter(Home);
