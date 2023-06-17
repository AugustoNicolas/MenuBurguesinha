import React, { createContext, useState,useEffect } from 'react';
import {getUser} from '../helpers/Users'
import {getReservaById} from '../helpers/Reservas'
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import {getListaServicios} from '../helpers/Servicios'

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
    const resp = await getReservaById(userInfo._id)
    if (resp){
      await setReservas(resp)
    }    
  }

  // apartado para servicios 

  const [servicios, setServicios] = useState([]);

  const fetchServicios = async () => {
    const listaServicios = await getListaServicios();
    if (listaServicios) {
      setServicios(listaServicios);
    }
  };

  const value = { userInfo, addUser, reservas, searchReservas, servicios, fetchServicios};

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};

