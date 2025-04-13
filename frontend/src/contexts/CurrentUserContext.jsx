import { createContext, useState } from 'react';

import { client } from '../utils/api';

import loadingPhoto from '../assets/images/profile/profile_loading_photo.png';

export const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    name: '...',
    about: '...',
    avatar: loadingPhoto,
    email: '...',
    _id: '000',
  });

  const handleUserInfo = async (token) => {
    try {
      const userData = await client.getUserInfo('/users/me', token);
      setCurrentUser(userData);
    } catch (error) {
      console.log('GET - /users/me', error);
      throw error;
    }
  };

  const handleUpdateUser = async (token, userData) => {
    try {
      const userUpdated = await client.updateUserInfo(
        '/users/me',
        token,
        userData
      );
      setCurrentUser(userUpdated);
    } catch (error) {
      console.log(`PATCH - /users/me -`, error);
    }
  };

  const handleUpdateAvatar = async (token, picture) => {
    try {
      const avatarUpdated = await client.updateUserAvatar(
        '/users/me/avatar',
        token,
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
        handleUserInfo,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
