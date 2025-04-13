import { useContext, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CardsContext } from '../../contexts/CardsContext';
import { LocalDataContext } from '../../contexts/LocalDataContext';
import { LoginContext } from '../../contexts/LoginContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const { handleUserInfo } = useContext(CurrentUserContext);
  const { handleInitialCards } = useContext(CardsContext);
  const { TokenInfo } = useContext(LocalDataContext);
  const { setIsloggedIn } = useContext(LoginContext);

  async function handleAutomaticLogin(token) {
    try {
      await handleUserInfo(token);
      await handleInitialCards(token);
      setIsloggedIn(true);
    } catch (error) {
      TokenInfo.remove();
      console.log('GET - Automatic Login', error);
    }
  }

  useEffect(() => {
    const token = TokenInfo.get();

    if (!token) {
      return;
    }

    handleAutomaticLogin(token);
  }, []);

  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <ProtectedRoute publicRoute>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path='/signin'
              element={
                <ProtectedRoute publicRoute>
                  <Signin />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
