import { render, screen } from '@testing-library/react';
import ArtistDetail from './ArtistDetail';
import { createMemoryHistory } from 'history';
import { MemoryRouter, NavigateFunction } from 'react-router-dom';

const state = {
  name: 'U2',
  id: '123',
  imageBigUrl: 'https://myimage.com',
  popularity: 73,
  genres: 'irish rock,permanent wave,rock',
  followers: 9391267
};
const artistDetailWithState = 
  <MemoryRouter>
    <ArtistDetail
      location={{state, key: '', pathname: '/artist-detail', search: '', hash: ''}}
      history={createMemoryHistory()}
      match={{ params: {} }}
      navigate={{} as unknown as NavigateFunction}
    /> 
  </MemoryRouter>;

describe('The Artist Detail Page', () => {
  it('renders the image given, the details and the track player', () => {
    render(artistDetailWithState);

    const imageRendered = screen.getByAltText('Artist detail');
    const detailsRendered = screen.getByTestId('detail_data');
    const trackPlayer = screen.getByTitle('Spotify Player');

    expect(imageRendered).toBeTruthy();
    expect(detailsRendered).toBeTruthy();
    expect(trackPlayer).toBeTruthy();
  });
});
