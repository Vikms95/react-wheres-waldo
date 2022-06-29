import React from 'react';
import {
  fireEvent, render, screen, act,
} from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('does render Navbar component', () => {
  const component = render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );

  expect(component).not.toBeNull();
});

test('does render correct header text', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );

  screen.getByText('FindMe');
  screen.getAllByText('Leaderboards');
  screen.getAllByText('Sign-out');
});

test('does render correct link href', () => {

});
