import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';

import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { CardsProvider } from './contexts/CardsContext';
import { LoadingPovider } from './contexts/LoadingContext';
import { PopupProvider } from './contexts/PopupContext';
import { LoginProvider } from './contexts/LoginContext';
import { LocalDataPovider } from './contexts/LocalDataContext';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LocalDataPovider>
        <LoginProvider>
          <PopupProvider>
            <LoadingPovider>
              <CurrentUserProvider>
                <CardsProvider>
                  <App />
                </CardsProvider>
              </CurrentUserProvider>
            </LoadingPovider>
          </PopupProvider>
        </LoginProvider>
      </LocalDataPovider>
    </BrowserRouter>
  </StrictMode>
);
