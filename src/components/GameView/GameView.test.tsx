import React from 'react';
import {
  getByRole, render, screen, waitFor,
} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import GameView from './GameView';
import ConsoleContext from '../../context/ConsoleContext';

let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  render(
    <ConsoleContext.Provider value="super-nintendo">
      <GameView />
    </ConsoleContext.Provider>,
  );
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('renders the component properly', () => {
  test('does render Gameview component', () => {
    expect(container).not.toBeNull();
  });

  test('does render the correct image given the passed context', () => {
    screen.getByAltText('super-nintendo');
  });

  test('does render 3 characters to find', () => {
    const imgEls = screen.getAllByAltText('character-to-find');

    expect(imgEls).not.toHaveLength(0);
    expect(imgEls).not.toHaveLength(1);
    expect(imgEls).not.toHaveLength(2);
    expect(imgEls).toHaveLength(3);
  });

  test('does render the timer and gets updated every second', async () => {
    jest.useFakeTimers();

    // re-render the component to now use the fake timers from Jest
    render(
      <ConsoleContext.Provider value="super-nintendo">
        <GameView />
      </ConsoleContext.Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    screen.getByText('00:01');

    act(() => {
      jest.advanceTimersByTime(49999);
    });

    screen.getByText('00:50');

    act(() => {
      jest.advanceTimersByTime(100000);
    });

    screen.getByText('02:30');

    jest.useRealTimers();
  });
});
