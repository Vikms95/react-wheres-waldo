import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import Homepage from './Homepage';

let container: any = null;
const mockHandleSelectedConsole = jest.fn();

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  render(
    <HashRouter>
      <Homepage
        handleSelectedConsole={mockHandleSelectedConsole}
      />
    </HashRouter>,
  );
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('does render Homepage component', () => {
  expect(container).not.toBeNull();
});

test('does properly render instructions title', () => {
  screen.getByText('Instructions');
  screen.getByText('How to play');
  screen.getByText('Leaderboard');
});

test('does properly render all 4 images', () => {
  const imageEls = screen.getAllByRole('img');
  expect(imageEls).toHaveLength(4);
  expect(imageEls).not.toHaveLength(5);
});
