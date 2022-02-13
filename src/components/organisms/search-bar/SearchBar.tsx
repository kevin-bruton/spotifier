import React from 'react';
import './SearchBar.scss';
import { CheckBox } from '../../atoms/checkbox/CheckBox';
import { InputText } from '../../molecules/input-text/InputText';
import { ArrowButton } from '../../molecules/arrow-button/ArrowButton';
import { AdvQuery } from '../../../models/interfaces';
import { t } from '../../../services/literals';

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
      mediaTypes: ['album', 'track', 'artist'],
      advQuery: { album: '', artist: '', track: '', year: '', genre: '' },
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
      || prevState.advQuery.year !== this.state.advQuery.year
      || prevState.advQuery.genre !== this.state.advQuery.genre;
    if (searchHasUpdated) {
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
        const mediaTypesWithoutType = mediaTypes.reduce(removeType, []);
        return { mediaTypes: mediaTypesWithoutType.length ? mediaTypesWithoutType: mediaTypes };
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
    const check = (type: string) => this.state.mediaTypes.includes(type);
    return (
      <div className={`searchbar${this.state.advancedSearch ? ' searchbar__showadvanced' : ''}`}>
        <span className="searchbar__heading">{t('searchbar_heading')}</span>
        <form className="searchbar__form">
          <div className="searchbar__form-gen-input">
            <InputText mode="search" placeholder={t('searchbar_main_input_placeholder')} label="" name="search_main" onChange={this.searchChanged.bind(this)} />
            <ArrowButton text={t('searchbar_advanced_search')} onClick={this.advSearchOptionChanged.bind(this)} />
          </div>
          <div className={this.state.advancedSearch ? 'searchbar_advancedarea--show' : 'searchbar_advancedarea--hide'}>
            <div>{t('searchbar_adv_search_instructions')}</div>
            <div className="searchbar__categoryinputs">
              <InputText mode="search" placeholder="" label={t('mediatype_artist')} name="search_artist" onChange={this.searchChanged.bind(this)} />
              <InputText mode="search" placeholder="" label={t('mediatype_album')} name="search_album" onChange={this.searchChanged.bind(this)} />
              <InputText mode="search" placeholder="" label={t('mediatype_track')} name="search_track" onChange={this.searchChanged.bind(this)} />
              <InputText mode="search" placeholder="" label={t('detail_year')} name="search_year" onChange={this.searchChanged.bind(this)} />
              <InputText mode="search" placeholder="" label={t('detail_genre')} name="search_genre" onChange={this.searchChanged.bind(this)} />
            </div>
            <div className="searchbar__checkboxesheader">{t('searchbar_mediatype_selection_instruction')}</div>
            <div className="searchbar__checkboxes">
              <CheckBox label={t('mediatype_track')} name="mediatype_track" checked={check('track')} onCheckedChange={this.mediaChecked.bind(this)} />
              <CheckBox label={t('mediatype_album')} name="mediatype_album" checked={check('album')} onCheckedChange={this.mediaChecked.bind(this)} />
              <CheckBox label={t('mediatype_artist')} name="mediatype_artist" checked={check('artist')} onCheckedChange={this.mediaChecked.bind(this)} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}