import axios from "axios"
import { API_URL } from "./config";


//recibe un usuario y si no existe lo agrega a la DB... pero de igual manera lo recibe xd
export const getReservaById = async (id_user) =>{
    try{ 
        const resp = await axios.get(`${API_URL}/reserva/${id_user}`);

        return resp.data
    } catch(error){

        }
        return null
       
}

export const getReservaByIdAndDate = async (id_user) =>{
    try{ 
        const resp = await axios.get(`${API_URL}/reservaDate/${id_user}`);
        return resp.data
    } catch(error){
        console.log(error)
        }
        return null
}
export const postReserva = async (reserva) =>{
    try{
        const resp = await axios.post(`${API_URL}/reserva`, reserva);
        return resp.data
    } catch(error){
        }
        return null
}