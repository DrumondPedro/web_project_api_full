import { createContext } from 'react';

import LocalData from '../utils/token';

export const LocalDataContext = createContext();

export function LocalDataPovider({ children }) {
  const TokenInfo = new LocalData({ TOKEN_KEY: 'jwt' });

  return (
    <LocalDataContext.Provider value={{ TokenInfo }}>
      {children}
    </LocalDataContext.Provider>
  );
}
