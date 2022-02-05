import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.scss';
import { SearchQuery } from './models/interfaces';
import { getSearchResults } from './services/api'
import { AppBar } from './components/app-bar/AppBar';
import { SearchBar } from './components/search-bar/SearchBar';

type State = { searchResults: any };
export class App extends React.Component<{}, State> {

  async onSearchUpdated(searchQuery: SearchQuery) {
    console.log('Search query in app:', searchQuery);
    const results = await getSearchResults(searchQuery);
    console.log('Search query results:', results)
  }

  render() {
    return (
      <div className="app__theme--dark">
        <AppBar />
        <SearchBar onSearchUpdated={this.onSearchUpdated.bind(this)}/>
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
}

export default App;
