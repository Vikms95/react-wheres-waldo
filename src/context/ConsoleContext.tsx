import React from 'react';

const Context = React.createContext(localStorage.getItem('consoleName') || '');

export default Context;
