import React, { createContext } from 'react';

const Context = createContext(localStorage.getItem('consoleName') || '');
export default Context;
