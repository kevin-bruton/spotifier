import React from 'react';
import './SearchBar.scss';
import { CheckBox } from '../checkbox/CheckBox';
import { InputText } from '../input-text/InputText';
import { ArrowButton } from '../arrow-button/ArrowButton';
import { AdvQuery } from '../../models/interfaces';

const SEARCH_UPDATE_FREQ = 500;

type Props = { onSearchUpdated: Function };
type State = {
  advancedSearch: boolean,
  genQuery: string,
  mediaTypes: Array<string>,
  advQuery: AdvQuery,
  lastSearchUpdate: number,
  searchTimeoutId: number
};
type MediaCheckedType = { name: string, checked: boolean };
type SearchChangedType = { name: string, value: string };
type AdvSearchOptionType = { position: string };

export class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      advancedSearch: false,
      genQuery: '',
      mediaTypes: [],
      advQuery: { album: '', artist: '', track: '', year: '' },
      lastSearchUpdate: new Date().valueOf(),
      searchTimeoutId: 0
    };
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    const searchHasUpdated = prevState.genQuery !== this.state.genQuery 
      || JSON.stringify(prevState.mediaTypes) !== JSON.stringify(this.state.mediaTypes)
      || prevState.advQuery.album !== this.state.advQuery.album
      || prevState.advQuery.artist !== this.state.advQuery.artist
      || prevState.advQuery.track !== this.state.advQuery.track
      || prevState.advQuery.year !== this.state.advQuery.year;
    const queryNotEmpty = !(this.state.genQuery === ''
      && this.state.advQuery.album === ''
      && this.state.advQuery.artist === ''
      && this.state.advQuery.track === ''
      && this.state.advQuery.year === '');
    console.log('componentDidUpdate. searchHasUpdated', searchHasUpdated, JSON.stringify(prevState.mediaTypes), JSON.stringify(this.state.mediaTypes))
    if (searchHasUpdated && queryNotEmpty) {
      const searchTimeoutId = window.setTimeout(() => {
        this.props.onSearchUpdated({
          genQuery: this.state.genQuery,
          advQuery: this.state.advQuery,
          mediaTypes: this.state.mediaTypes
        });
      }, SEARCH_UPDATE_FREQ);
      clearTimeout(this.state.searchTimeoutId);
      this.setState({ searchTimeoutId });
    }
  }

  mediaChecked({ name, checked }: MediaCheckedType) {
    const mediaType = name.substring(name.indexOf('_') + 1);
    if (checked) {
      this.setState(state => {
        const mediaExists = state.mediaTypes.includes(mediaType);
        const mediaTypes = mediaExists
          ? [...state.mediaTypes]
          : [...state.mediaTypes, ...[mediaType]];
        return { mediaTypes };
      });
    } else {
      this.setState(state => {
        const mediaTypes = [...state.mediaTypes];
        const removeType = (types: Array<string>, type: string): string[] => (type === mediaType ? types : [...types, ...[type]]);
        const mediaTypesWithoutType = mediaTypes.reduce(removeType, [])
        return { mediaTypes: mediaTypesWithoutType };
      });
    }
  }

  searchChanged({ name, value }: SearchChangedType) {
    const category = name.substring(name.indexOf('_') + 1);
    if (category === 'main') {
      this.setState({ genQuery: value });
    } else {
      this.setState(state => ({
        advQuery: {
          ...state.advQuery,
          ...{ [category]: value }
      } }));
    }
  }

  advSearchOptionChanged({ position }: AdvSearchOptionType) {
    this.setState({ advancedSearch: position === 'open' });
  }

  render() {
    return (
      <div className={`searchbar${this.state.advancedSearch ? ' searchbar__showadvanced' : ''}`}>
        <span className="searchbar__heading">Search for your favourite artists, albums and tracks</span>
        <form className="searchbar__form">
          <InputText mode="search" placeholder="Artist, album or track" label="" name="search_main" onChange={this.searchChanged.bind(this)} />
          <ArrowButton text="Advanced search" onClick={this.advSearchOptionChanged.bind(this)} />
          <div>
            <div>Narrow down your search:</div>
            <div className="searchbar__categoryinputs">
              <InputText mode="search" placeholder="" label="Artist" name="search_artist" onChange={this.searchChanged.bind(this)} />
              <InputText mode="search" placeholder="" label="Album" name="search_album" onChange={this.searchChanged.bind(this)} />
              <InputText mode="search" placeholder="" label="Track" name="search_track" onChange={this.searchChanged.bind(this)} />
              <InputText mode="search" placeholder="" label="Year" name="search_year" onChange={this.searchChanged.bind(this)} />
            </div>
            <div className="checkbox__container">
              Media type:
              <CheckBox label="Album" name="mediatype_album" onCheckedChange={this.mediaChecked.bind(this)} />
              <CheckBox label="Artist" name="mediatype_artist" onCheckedChange={this.mediaChecked.bind(this)} />
              <CheckBox label="Playlist" name="mediatype_playlist" onCheckedChange={this.mediaChecked.bind(this)} />
              <CheckBox label="Track" name="mediatype_track" onCheckedChange={this.mediaChecked.bind(this)} />
              <CheckBox label="Show" name="mediatype_show" onCheckedChange={this.mediaChecked.bind(this)} />
              <CheckBox label="Episode" name="mediatype_episode" onCheckedChange={this.mediaChecked.bind(this)} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}