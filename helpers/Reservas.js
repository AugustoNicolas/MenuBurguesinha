import axios from "axios"
import { API_URL } from "./config";


//recibe un usuario y si no existe lo agrega a la DB... pero de igual manera lo recibe xd
export const getReservaById = async () =>{
    try{ 
        console.log("holaaa")
        const resp = await axios.get(`${API_URL}/reserva/648a848666110bc8fd8d9fc4`);
        console.log(resp)
        return resp.data
    } catch(error){
        console.log(error)
        }
        return null
       
}

export const getReservaByIdAndDate = async () =>{
    try{ 
        const resp = await axios.get(`${API_URL}/reservaDate/648a85b1cb416ea61f2817a0`);
        return resp.data
    } catch(error){
        console.log(error)
        }
        return null
       
}