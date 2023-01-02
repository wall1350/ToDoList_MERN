import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders main page', () => {
  render(<App />);
  expect(screen.getByText("Create new ToDo")).toBeInTheDocument();
  expect(screen.getByText("ToDo List")).toBeInTheDocument();
});
