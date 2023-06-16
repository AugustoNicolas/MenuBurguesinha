import React, { createContext, useState } from 'react';
import {getUser} from '../helpers/Users'

export const userContext = createContext();

export const UsersProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const addUser = async (user) => {
    const ur = await getUser(user)
    //console.log(ur)
    if (ur){
      await setUserInfo(ur)
    }    
  }

  const value = { userInfo, addUser };

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};
