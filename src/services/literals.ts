export {
  setLanguage,
  t
}

type Translations = {en: string, es: string };
type Languages = 'en' | 'es';

const DEFAULT_LANGUAGE = 'en';
let lang: Languages = DEFAULT_LANGUAGE;

function setLanguage(language: Languages) {
  lang = language;
}

function t(key: string): string {
  const translations: Translations = getLiterals()[key] || { en: '', es: '' };
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}

function getLiterals(): {[key: string]: Translations} {
  return {
    appbar_alt: {
      en: 'Spotify',
      es: 'Spotify'
    },
    searchbar_heading: {
      en: 'Search for your favourite artists, albums and tracks',
      es: 'Busca tus artistas, álbumes y canciones favoritos'
    },
    searchbar_main_input_placeholder: {
      en: 'Artist, album, or track',
      es: 'Artista, álbum o canción'
    },
    searchbar_advanced_search: {
      en: 'Advanced search',
      es: 'Búsqueda avanzada'
    },
    searchbar_adv_search_instructions: {
      en: 'Narrow down your search:',
      es: 'Afinar tu búsqueda:'
    },
    mediatype_artist: {
      en: 'Artist',
      es: 'Artista'
    },
    mediatype_album: {
      en: 'Album',
      es: 'Álbum'
    },
    mediatype_track: {
      en: 'Track',
      es: 'Canción'
    },
    detail_year: {
      en: 'Year',
      es: 'Año'
    },
    detail_genre: {
      en: 'Genre',
      es: 'Género'
    },
    searchbar_mediatype_selection_instruction: {
      en: 'Media type (at least one required):',
      es: 'Tipo de multimedia (seleccionar al menos uno):'
    },
    detail_open_in_spotify: {
      en: 'Open in Spotify',
      es: 'Abrir en Spotify'
    },
    detail_type_album: {
      en: 'Album detail',
      es: 'Detalle del álbum'
    },
    detail_type_track: {
      en: 'Track detail',
      es: 'Detalle de la canción'
    },
    detail_type_artist: {
      en: 'Artist detail',
      es: 'Detalle del artista'
    },
    album_type: {
      en: 'Album type',
      es: 'Tipo de Álbum'
    },
    release_date: {
      en: 'Release date',
      es: 'Fecha de lanzamiento'
    },
    total_tracks: {
      en: 'Total tracks',
      es: 'Número de canciones'
    },
    popularity: {
      en: 'Popularity',
      es: 'Popularidad'
    },
    genres: {
      en: 'Genres',
      es: 'Géneros'
    },
    followers: {
      en: 'Followers',
      es: 'Seguidores'
    },
    track_number: {
      en: 'Track number',
      es: 'Número de canción'
    },
    duration: {
      en: 'Duration',
      es: 'Duración'
    }
  };
}

