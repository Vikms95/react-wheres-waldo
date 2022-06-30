import { format } from 'path';
import capitalizeString from './capitalizeString';
import formatTimer from './formatTimer';
import getCurrentDate from './getCurrentDate';

describe('capitalizeString', () => {
  test('properly capitalizes string', () => {
    expect(capitalizeString('hello')).toBe('Hello');
  });

  test('properly capitalizes segmented string', () => {
    expect(capitalizeString('hello my friend')).toBe('Hello my friend');
  });
});

describe('formatTimer', () => {
  test('properly formats time value', () => {
    expect(formatTimer('65')).toBe('01:05');
  });

  test('properly formats time value over 10', () => {
    expect(formatTimer('50000')).toBe('53:20');
  });
});

describe('getCurrentDate', () => {
  test('properly returns current date', () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const date = `${dd} / ${mm} / ${yyyy}`;

    expect(getCurrentDate()).toEqual(date);
  });
});
