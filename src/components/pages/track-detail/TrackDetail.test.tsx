import { render, screen } from '@testing-library/react';
import TrackDetail from './TrackDetail';
import { createMemoryHistory } from 'history';
import { MemoryRouter, NavigateFunction } from 'react-router-dom';

const state = {
  name: 'Sunday Bloody Sunday',
  id: '123',
  imageBigUrl: 'https://myimage.com',
  artist: 'U2',
  albumName: 'War',
  trackNumber: 1,
  durationMs: 279440,
  popularity: 73
};
const trackDetailWithState = 
  <MemoryRouter>
    <TrackDetail
      location={{state, key: '', pathname: '/track-detail', search: '', hash: ''}}
      history={createMemoryHistory()}
      match={{ params: {} }}
      navigate={{} as unknown as NavigateFunction}
    /> 
  </MemoryRouter>;

describe('The Track Detail Page', () => {
  it('renders the image given, the details and the track player', () => {
    render(trackDetailWithState);

    const imageRendered = screen.getByAltText('Track detail');
    const detailsRendered = screen.getByTestId('detail_data');
    const trackPlayer = screen.getByTitle('Spotify Player');

    expect(imageRendered).toBeTruthy();
    expect(detailsRendered).toBeTruthy();
    expect(trackPlayer).toBeTruthy();
  });

  it('the value displayed for track duration is calculated correctly', () => {
    const EXPECTED_DURATION_MINUTES = '4';
    const EXPECTED_DURATION_SECONDS = '39';

    render(trackDetailWithState);

    const detailsRendered = screen.getByTestId('detail_data');
    const dataCells = Array.from(detailsRendered.querySelectorAll('.detail__datacell')).map(cell => cell.innerHTML);
    const [displayedMinutes, , displayedSeconds, ] = dataCells[5].split(' ');
    
    expect(displayedMinutes).toEqual(EXPECTED_DURATION_MINUTES);
    expect(displayedSeconds).toEqual(EXPECTED_DURATION_SECONDS);
  });
});
