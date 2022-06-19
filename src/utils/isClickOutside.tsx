import React from 'react';

const isClickOutside = (
  event: MouseEvent,
  ref?: React.MutableRefObject<any>,
  condition?: any,
) => {
  // eslint-disable-next-line max-len
  console.log((event.target as HTMLInputElement).getAttribute('alt'));
  return ref?.current && condition && !ref?.current.contains(event.target as HTMLInputElement);
};

export default isClickOutside;
