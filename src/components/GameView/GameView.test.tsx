import React from 'react';
import {
  fireEvent,
  getByRole, render, screen, waitFor,
} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
  BrowserRouter,
} from 'react-router-dom';
import App from '../../App';
import DropdownButton from '../GameDropdown/DropdownButton';
import GameView from './GameView';
import ConsoleContext from '../../context/ConsoleContext';
import GameImage from './GameImage';

let container: any = null;

describe('renders the component properly', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <BrowserRouter>
        <ConsoleContext.Provider value="super-nintendo">
          <GameView />
        </ConsoleContext.Provider>
      </BrowserRouter>,

    );
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('does render Gameview component', () => {
    render(<App />);
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
    // jest.useFakeTimers();
    // re-render the component to now use the fake timers from Jest
    // render(
    //   <BrowserRouter>
    //     <ConsoleContext.Provider value="super-nintendo">
    //       <GameView />
    //     </ConsoleContext.Provider>
    //     ,
    //   </BrowserRouter>,
    // );

    //   act(() => {
    //     jest.advanceTimersByTime(1000);
    //   });

    //   screen.getByText('00:01');

    //   act(() => {
    //     jest.advanceTimersByTime(49999);
    //   });

    //   screen.getByText('00:50');

    //   act(() => {
    //     jest.advanceTimersByTime(100000);
    //   });

    //   screen.getByText('02:30');

  //   jest.useRealTimers();
  // });
  });
});

describe('dropdown', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('has display flex when image element is clicked', () => {
    render(
      <BrowserRouter>
        <ConsoleContext.Provider value="super-nintendo">
          <GameView />
        </ConsoleContext.Provider>
        ,
      </BrowserRouter>,
    );

    const imgEl = screen.getByAltText('super-nintendo');
    const dropdownEl = screen.getByTestId('dropdown-container');
    act(() => {
      fireEvent.click(imgEl);
    });

    expect(dropdownEl).toHaveStyle('display: flex');
  });

  test('has display none when close button from dropdown is clicked', () => {
    render(
      <BrowserRouter>
        <ConsoleContext.Provider value="super-nintendo">
          <GameView />
        </ConsoleContext.Provider>
        ,
      </BrowserRouter>,
    );

    const imgEl = screen.getByAltText('super-nintendo');
    const dropdownEl = screen.getByTestId('dropdown-container');
    const closeDropdownEl = screen.getByRole('button', { name: 'Close' });

    act(() => {
      fireEvent.click(imgEl);
    });

    act(() => {
      fireEvent.click(closeDropdownEl);
    });

    expect(dropdownEl).toHaveStyle('display: none');
  });

  test('GameImage triggers their event listener', () => {
    const mockRenderGameDropdown = jest.fn();

    render(
      <ConsoleContext.Provider value="super-nintendo">
        <GameImage
          renderGameDropdown={mockRenderGameDropdown}
        />
      </ConsoleContext.Provider>,
    );
    const imgEl = screen.getByAltText('super-nintendo');

    act(() => {
      fireEvent.click(imgEl);
      fireEvent.click(imgEl);
    });

    expect(mockRenderGameDropdown).toHaveBeenCalledTimes(2);
  });

  test('buttons trigger their event listeners', () => {
    const mockCheckCoordinatesOnDatabase = jest.fn();

    render(
      <ConsoleContext.Provider value="super-nintendo">
        <DropdownButton
          name="mario"
          checkCoordinatesOnDatabase={mockCheckCoordinatesOnDatabase}
        />
      </ConsoleContext.Provider>,
    );
    const buttonEl = screen.getByRole('button', { name: 'Mario' });

    act(() => {
      fireEvent.click(buttonEl);
      fireEvent.click(buttonEl);
    });

    expect(mockCheckCoordinatesOnDatabase).toHaveBeenCalledTimes(2);
  });
});
