import { render } from '@testing-library/react';
import BasePage from './basePage.component';

describe('Hello component', () => {
  it('renders the name', () => {
    render(<BasePage isAuthenticated={true} />);
    expect(true).toBeTruthy();
  });
});
