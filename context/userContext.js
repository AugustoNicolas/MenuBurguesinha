import React, { createContext, useState,useEffect } from 'react';
import {getUser} from '../helpers/Users'
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

export const userContext = createContext();

export const UsersProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const addUser = async (user) => {
    const ur = await getUser(user);
    if (ur) {
      setUserInfo(ur);
    }
  };


  const value = { userInfo, addUser};

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};

