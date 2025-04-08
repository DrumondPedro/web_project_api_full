import { createContext, useState } from 'react';

import { client, clientEmail } from '../utils/api';

import loadingPhoto from '../assets/images/profile/profile_loading_photo.png';

export const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    name: '...',
    about: '...',
    avatar: loadingPhoto,
    _id: '000',
    cohort: '...',
  });

  const [userEmail, setUserEmail] = useState({
    data: {
      _id: '000',
      email: '...',
    },
  });

  const handleUserInfo = async () => {
    try {
      const userData = await client.getUserInfo('/users/me');
      setCurrentUser(userData);
    } catch (error) {
      console.log('GET - /users/me', error);
      throw error;
    }
  };

  const handleUserEmail = async (token) => {
    try {
      const userEmailData = await clientEmail.getUserEmail('/users/me', token);
      setUserEmail(userEmailData);
    } catch (error) {
      console.log('GET - /users/me', error);
      throw error;
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const userUpdated = await client.updateUserInfo('/users/me', userData);
      setCurrentUser(userUpdated);
    } catch (error) {
      console.log(`PATCH - /users/me -`, error);
    }
  };

  const handleUpdateAvatar = async (picture) => {
    try {
      const avatarUpdated = await client.updateUserAvatar(
        '/users/me/avatar',
        picture
      );
      setCurrentUser(avatarUpdated);
    } catch (error) {
      console.log(`PATCH - /users/me/avatar -`, error);
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        userEmail,
        handleUserInfo,
        handleUserEmail,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
