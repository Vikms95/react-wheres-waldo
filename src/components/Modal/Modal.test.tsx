import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import App from '../../App';
import Modal from './Modal';

let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  render(<App />);
  render(
    <HashRouter>
      <Modal
        timeElapsed={50}
      />
      ,
    </HashRouter>,
  );
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('does renders Modal component ', () => {
  expect(container).not.toBeNull();
});

test('does render the correct time elapsed', () => {
  const timerEl = screen.getByTestId('timer-value');
  expect(timerEl).toHaveTextContent('00:50');
});

test('does render all buttons', () => {
  const buttonEls = [
    screen.getByRole('button', { name: 'Post score' }),
    screen.getByRole('button', { name: 'Leaderboards' }),
    screen.getByRole('button', { name: 'Home' }),
  ];

  expect(buttonEls).toHaveLength(3);
});

test('input does render the values from state', () => {
  // const inputEl = screen.getByRole('textbox');

  // act(() => {
  //   fireEvent.keyDown(inputEl, {
  //     key: 'KeyA',
  //     keyCode: 65,
  //   });
  // });

  // expect(inputEl).toHaveValue('test');
});
