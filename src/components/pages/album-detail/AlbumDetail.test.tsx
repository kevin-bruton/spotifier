import { render, screen } from '@testing-library/react';
import AlbumDetail from './AlbumDetail';
import { createMemoryHistory } from 'history';
import { MemoryRouter, NavigateFunction } from 'react-router-dom';

const state = {
  name: 'War',
  id: '123',
  imageBigUrl: 'https://myimage.com',
  artist: 'U2',
  type: 'album',
  releaseDate: '1983-02-28',
  totalTracks: 10
};
const albumDetailWithState = 
  <MemoryRouter>
    <AlbumDetail
      location={{state, key: '', pathname: '/album-detail', search: '', hash: ''}}
      history={createMemoryHistory()}
      match={{ params: {} }}
      navigate={{} as unknown as NavigateFunction}
    /> 
  </MemoryRouter>;

describe('The Album Detail Page', () => {
  it('renders the image given, the details and the track player', () => {
    render(albumDetailWithState);

    const imageRendered = screen.getByAltText('Album detail');
    const detailsRendered = screen.getByTestId('detail_data');
    const trackPlayer = screen.getByTitle('Spotify Player');

    expect(imageRendered).toBeTruthy();
    expect(detailsRendered).toBeTruthy();
    expect(trackPlayer).toBeTruthy();
  });
});
