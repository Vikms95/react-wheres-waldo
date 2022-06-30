import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import Leaderboards from './Leaderboards';

let container: any = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  render(
    <Leaderboards />,
  );
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('does render Leaderboards component', () => {
  expect(container).not.toBeNull();
});
