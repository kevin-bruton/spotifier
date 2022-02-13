import { render, screen, waitFor } from '@testing-library/react';
import { ItemCard } from './ItemCard';

describe.only('The Item Card Component', () => {
  it('should render a card with an image, title and a subtitle', () => {
    render(
      <ItemCard title="Card title" subtitle="Card subtitle" imageurl="https://myimage.com" />
    );
    screen.getByAltText('Card title');
    screen.getByText('Card title');
    screen.getByText('Card subtitle');
  });

  it('should replace fallback image with the intended one when it is loaded', async () => {
    (window.Image as any) = class {
      [x: string]: any;
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 10);
      }
    }
    render(
      <ItemCard title="Card title" subtitle="Card subtitle" imageurl="https://myimage.com" />
    );
    await waitFor(() =>
      expect((screen.getByAltText('Card title') as any).src).toEqual('https://myimage.com/')
    );
  });
});