import React from 'react';
import {
  fireEvent, render, screen, act,
} from '@testing-library/react';
import App from './App';

describe('app rendering', () => {
  test('renders application', () => {
    render(<App />);

    const appEl = screen.getByTestId('App');
    const headerEl = screen.getByRole('heading', { name: 'FindMe' });

    expect(appEl).toBeInTheDocument();
    expect(headerEl).toBeInTheDocument();
  });

  test('does not render application', () => {
    render(<div />);

    expect(screen
      .queryByRole('heading', { name: 'FindMe' }))
      .not.toBeInTheDocument();
  });
});

describe('localStorage', () => {
  test('does store consoleName on localStorage when console panel is clicked', () => {
    render(<App />);

    const snesButtonEl = screen.getByTestId('super-nintendo');
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');

    act(() => {
      fireEvent.click(snesButtonEl);
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('does not store consoleName to localStorage when console panel is not clicked', () => {
    render(<App />);

    const headerEl = screen.getByRole('heading', { name: 'FindMe' });
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');

    act(() => {
      fireEvent.click(headerEl);
    });

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test('does not call localStorage *getItem* when its value is empty', () => {
    render(<App />);

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });

  test('does call localStorage *getItem* when its value is previously set', () => {
    render(<App />);

    act(() => {
      window.localStorage.setItem('consoleName', 'super-nintendo');
    });

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
