import axios from "axios"
import { API_URL } from "./config";


//recibe un usuario y si no existe lo agrega a la DB... pero de igual manera lo recibe xd
export const getUser = async (user) =>{
    try{
        const resp = await axios.post(`${API_URL}/usuario/getC`, user);
        return resp.data
    } catch(error){
        console.log(error)
        }
        return null
}
export const getUsuarios = async () => {
    try {
      const resp = await axios.get(`${API_URL}/usuario`);
      //console.log('Datos de usuarios obtenidos:', resp.data);
      return resp.data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      return null;
    }
  };
  

