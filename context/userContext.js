import React, { createContext, useState,useEffect } from 'react';
import {getUser} from '../helpers/Users'
import {getReservaById} from '../helpers/Reservas'
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

  //  apartado para reservas 
  const [reservas, setReservas] = useState([]);

  const searchReservas = async () => {
    const resp = await getReservaById()
    if (resp){
      console.log(resp)
      await setReservas(resp)
    }    
  }


  const value = { userInfo, addUser, reservas, searchReservas};

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};

