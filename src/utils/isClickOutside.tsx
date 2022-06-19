import React from 'react';

const isClickOutside = (
  event: MouseEvent,
  ref?: React.MutableRefObject<any>,
  condition?: any,
) => (
  ref?.current && condition && !ref?.current.contains(event.target as HTMLInputElement)
);

export default isClickOutside;
