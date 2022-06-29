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

describe('react-router', () => {
  test('does render Homepage component when home button is clicked', () => {
    render(<App />);

    const headerEl = screen.getByRole('heading', { name: 'FindMe' });

    act(() => {
      fireEvent.click(headerEl);
    });

    const instructionsEl = screen.getByRole('heading', { name: 'How to play' });
    expect(instructionsEl).toBeInTheDocument();
  });

  test('does not render Homepage component when home button is not clicked', () => {
    render(<App />);

    const leaderboardsEl = screen.getByRole('heading', { name: 'Leaderboards' });

    act(() => {
      fireEvent.click(leaderboardsEl);
    });

    const instructionsEl = screen.queryByRole('heading', { name: 'How to play' });
    expect(instructionsEl).not.toBeInTheDocument();
  });

  test('does render LeaderboardsMenu component when leaderboard button is clicked', () => {
    render(<App />);

    const leaderboardsEl = screen.getByRole('heading', { name: 'Leaderboards' });

    act(() => {
      fireEvent.click(leaderboardsEl);
    });

    const snesHeadingEl = screen.getByRole('heading', { name: 'Super Nintendo' });
    expect(snesHeadingEl).toBeInTheDocument();
  });

  test('does not render LeaderboardMenu component when leaderboard button is not clicked', () => {
    render(<App />);

    const headerEl = screen.getByRole('heading', { name: 'FindMe' });

    act(() => {
      fireEvent.click(headerEl);
    });

    const snesHeadingEl = screen.queryByRole('heading', { name: 'Super Nintendo' });
    expect(snesHeadingEl).not.toBeInTheDocument();
  });

  test('does render Leaderboards component when leaderboard panel is clicked', () => {
    render(<App />);

    const leaderboardsEl = screen.getByRole('heading', { name: 'Leaderboards' });

    act(() => {
      fireEvent.click(leaderboardsEl);
    });

    const snesHeadingEl = screen.getByRole('heading', { name: 'Super Nintendo' });
    expect(snesHeadingEl).toBeInTheDocument();
  });

  test('does not render Leaderboard component when leaderboard panel is not clicked', () => {
    render(<App />);

    const leaderboardsEl = screen.getByRole('heading', { name: 'Leaderboards' });

    act(() => {
      fireEvent.click(leaderboardsEl);
    });

    const leaderboardsSnesEl = screen.getByTestId('super-nintendo-leaderboard');

    act(() => {
      fireEvent.click(leaderboardsSnesEl);
    });

    const tableEl = screen.getAllByRole('table');
    expect(tableEl).toBeDefined();
  });
});
