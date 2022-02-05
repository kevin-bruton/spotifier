export interface AdvQuery {
  album: string;
  artist: string;
  track: string;
  year: string;
  genre: string;
  [key: string]: string;
}

export interface SearchQuery {
  genQuery: string,
  advQuery: AdvQuery,
  mediaTypes: Array<string>
}
