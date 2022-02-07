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

export interface Track {
  id: string,
  name: string,
  previewUrl: string,
  externalUrl: string,
  imageUrl: string,
  artist: string
}

export interface Album {
  id: string,
  name: string,
  artist: string,
  imageUrl: string,
  externalUrl: string
}

export interface Artist {
  id: string,
  name: string,
  imageUrl: string,
  externalUrl: string
}
