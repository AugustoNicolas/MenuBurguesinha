import axios from "axios"
import { API_URL } from "./config";


//recibe un usuario y si no existe lo agrega a la DB... pero de igual manera lo recibe xd
export const postPlato = async (plato) =>{
    try{
        const resp = await axios.post(`${API_URL}/plato`, plato);
        return resp.data
    } catch(error){

        }
        return null
       
}

export const getPlatos=async()=>{
    try{
        const resp = await axios.get(`${API_URL}/plato`);
        return resp.data;
    }catch(error){
        console.error('Error al obtener los usuarios:', error);
        return null
    }
}