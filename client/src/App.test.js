import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Built on a Legacy, Research, Observation and Knowledge/i);
  expect(linkElement).toBeInTheDocument();
});
