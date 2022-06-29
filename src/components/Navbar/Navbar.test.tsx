import React from 'react';
import {
  fireEvent, render, screen, act,
} from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('does render Navbar component', () => {
  // Navbar requires wrapping it with HashRouter because its
  // placement is outside of the Routes
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

test('does render correct header link href', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );

  const linkEls = screen.getAllByRole('link');

  expect(linkEls[0]).toHaveAttribute('href', '#/');
  expect(linkEls[1]).toHaveAttribute('href', '#/leaderboards/*');
});

test('does not render header dropdown on button click when page is expanded', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );

  const dropdownEl = screen.getByTestId('header-dropdown');
  expect(dropdownEl).toHaveAttribute('hidden');
});

test('does render header dropdown on button click when page is shrinked', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );
  // need to shrink the viewport to show button to click
  global.innerWidth = 600;

  const buttonEl = screen.getByTestId('open-header-dropdown');

  act(() => {
    fireEvent.click(buttonEl);
  });

  const dropdownEl = screen.getByTestId('header-dropdown');
  expect(dropdownEl).not.toHaveAttribute('hidden');
});
