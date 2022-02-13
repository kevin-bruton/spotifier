import { fireEvent, render, screen } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockSearchResults: any = {
  tracks: { items: [{
    id: '123',
    name: 'Sunday Bloody Sunday',
    album: { name: 'War', images: [{ url: 'https://myimage.com' }] },
    artists: [{ name: 'U2' }],
    track_number: 1,
    duration_ms: 255,
    popularity: 73
  }]},
  albums: { items: [{
    id: '234',
    name: 'War',
    artists: [{ name: 'U2' }],
    images: [{ url: 'https://myimage.com' }],
    album_type: 'album',
    release_date: '1983-02-28',
    total_tracks: 10
  }]},
  artists: { items: [{
    id: '345',
    name: 'U2',
    images: [{ url: 'https://myimage.com' }],
    popularity: 73,
    genres: ['irish rock', 'permanent wave', 'rock'],
    followers: { total: 9391267 }
  }]}
};

const server = setupServer(
  rest.post('https://accounts.spotify.com/api/token', (req, res, ctx) =>
    res(ctx.json({ access_token: '123', expires_in: 234, token_type: 'auth'}))),
  rest.get('https://api.spotify.com/v1/search', (req, res, ctx) => {
    const typesRequested = req.url.searchParams.get('type')?.split(',').map(type => `${type}s`);
    const results = typesRequested?.reduce((results, type) => ({...results, ...{[type]: mockSearchResults[type]}}), {});
    return res(ctx.json(results));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('The Home Page Component', () => {
  it('renders the Home Component', () => {
    render(
      <MemoryRouter>
        <Home/>
      </MemoryRouter>
      );
    screen.getByAltText('Spotify');
  });

  it('renders search results when user enters text in the search input box', async () => {
    render(
      <MemoryRouter>
        <Home/>
      </MemoryRouter>
    );
    const searchInput: HTMLInputElement = screen.getByPlaceholderText('Artist, album, or track');
    fireEvent.change(searchInput, { target: { value: 'U2' } });
    await screen.findByTestId('searchresults-tracks');
    screen.getByAltText('Sunday Bloody Sunday');
  });

  it('does not render search results when user has not entered text or has cleared text from the search boxes', async () => {
    render(
      <MemoryRouter>
        <Home/>
      </MemoryRouter>
    );
    const genSearchInput: HTMLInputElement = screen.getByPlaceholderText('Artist, album, or track');
    const artistSearchInput: HTMLInputElement = screen.getByAltText('search artist');
    const albumSearchInput: HTMLInputElement = screen.getByAltText('search album');
    const trackSearchInput: HTMLInputElement = screen.getByAltText('search track');
    const yearSearchInput: HTMLInputElement = screen.getByAltText('search year');
    const genreSearchInput: HTMLInputElement = screen.getByAltText('search genre');
    const clearGenSearchBtn: HTMLButtonElement = screen.getByAltText('clear search main');
    const clearArtistSearchBtn: HTMLButtonElement = screen.getByAltText('clear search artist');
    const clearAlbumSearchBtn: HTMLButtonElement = screen.getByAltText('clear search album');
    const clearTrackSearchBtn: HTMLButtonElement = screen.getByAltText('clear search track');
    const clearYearSearchBtn: HTMLButtonElement = screen.getByAltText('clear search year');
    const clearGenreSearchBtn: HTMLButtonElement = screen.getByAltText('clear search genre');

    // Have to set a different previous value to provoke the fireEvent to actually fire
    fireEvent.change(genSearchInput, { target: { value: 'x' } });
    fireEvent.change(artistSearchInput, { target: { value: 'x' } });
    fireEvent.change(albumSearchInput, { target: { value: 'x' } });
    fireEvent.change(trackSearchInput, { target: { value: 'x' } });
    fireEvent.change(yearSearchInput, { target: { value: 'x' } });
    fireEvent.change(genreSearchInput, { target: { value: 'x' } });
    fireEvent.click(clearGenSearchBtn);
    fireEvent.click(clearArtistSearchBtn);
    fireEvent.click(clearAlbumSearchBtn);
    fireEvent.click(clearTrackSearchBtn);
    fireEvent.click(clearYearSearchBtn);
    fireEvent.click(clearGenreSearchBtn);
    let tracksReturned = true;
    try {
      await screen.findByTestId('searchresults-tracks');
    } catch(err) {
      tracksReturned = false;
    } finally {
      expect(tracksReturned).toBeFalsy();
    }
  });

  it('should only render tracks if it is the only media type selected', async () => {
    render(
      <MemoryRouter>
        <Home/>
      </MemoryRouter>
    );
    const advancedSearchBtn: HTMLButtonElement = screen.getByTestId('advanced-search');
    const trackCheckBox: HTMLInputElement = screen.getByLabelText('Track');
    const albumCheckBox: HTMLInputElement = screen.getByLabelText('Album');
    const artistCheckBox: HTMLInputElement = screen.getByLabelText('Artist');

    fireEvent.click(advancedSearchBtn);
    fireEvent.click(trackCheckBox);
    fireEvent.click(trackCheckBox);
    fireEvent.click(albumCheckBox);
    fireEvent.click(artistCheckBox);

    expect(trackCheckBox.checked).toBe(true);
    expect(albumCheckBox.checked).toBe(false);
    expect(artistCheckBox.checked).toBe(false);

    const searchInput: HTMLInputElement = screen.getByPlaceholderText('Artist, album, or track');
    fireEvent.change(searchInput, { target: { value: 'U2' } });
    const trackResults = await screen.findByTestId('searchresults-tracks');
    const albumResults = screen.queryByTestId('searchresults-albums');
    const artistResults = screen.queryByTestId('searchresults-artists');

    expect(trackResults).not.toEqual(null);
    expect(albumResults).toEqual(null);
    expect(artistResults).toEqual(null);
  });
});
