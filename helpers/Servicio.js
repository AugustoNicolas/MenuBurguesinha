<<<<<<< HEAD
import axios from 'axios';
import { API_URL } from './config';


export const postServicios=async(servicio)=>{
    try {
        const response = await axios.post(`${API_URL}/servicio`, servicio);
        return response.data;
      } catch (error) {
        throw new Error('Error al guardar el servicio');
    }
=======
import axios from 'axios'
import { API_URL } from "./config";

export const getFechaServicio = async(fecha) => {
    try {
        const response = await axios.get(`${API_URL}/servicio/${fecha}`);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error(error);
        throw error; // Lanza el error para que pueda ser capturado en el lugar donde se llama a esta función
      }
>>>>>>> misa
}