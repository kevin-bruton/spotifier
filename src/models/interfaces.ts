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
  imageUrlBig: string,
  artist: string,
  albumName: string,
  trackNumber: number,
  durationMs: number,
  popularity: number
}

export interface Album {
  id: string,
  name: string,
  artist: string,
  imageUrl: string,
  imageUrlBig: string,
  externalUrl: string,
  type: string,
  releaseDate: string,
  totalTracks: number
}

export interface Artist {
  id: string,
  name: string,
  imageUrl: string,
  imageUrlBig: string,
  externalUrl: string,
  popularity: number,
  genres: string,
  followers: number
}
