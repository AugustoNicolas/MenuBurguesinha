import axios from "axios"
import { API_URL } from "./config";

export const postReserva = async (reserva) =>{
    try{
        const resp = await axios.post(`${API_URL}/reserva`, reserva);
        return resp.data
    } catch(error){
        }
        return null
}