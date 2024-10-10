'use client';

import { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <StoreContext.Provider value={{ theme, setTheme }}>
      {children}
    </StoreContext.Provider>
  );
};
