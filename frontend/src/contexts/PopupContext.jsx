import { createContext, useState } from 'react';

export const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [popup, setPopup] = useState(null);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <PopupContext.Provider value={{ popup, handleOpenPopup, handleClosePopup }}>
      {children}
    </PopupContext.Provider>
  );
}
