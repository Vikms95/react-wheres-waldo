import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from '../../App';
import Leaderboards from './Leaderboards';

let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  // We also render App component to avoid having to mock Firebase
  render(<App />);
  render(<Leaderboards />);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('does render Leaderboards component', () => {
  expect(container).not.toBeNull();
});

test('does render Leaderboards text properly', () => {
  expect(screen.getAllByText('Player')).toHaveLength(2);
  expect(screen.getAllByText('Score')).toHaveLength(2);
});

test('does render both tables', () => {
  const tableEls = screen.getAllByRole('table');
  expect(tableEls).not.toHaveLength(1);
  expect(tableEls).toHaveLength(2);
});
