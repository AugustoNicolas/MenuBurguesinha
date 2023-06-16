import axios from 'axios';
import { API_URL } from './config';


export const postServicios=async(servicio)=>{
    try {
        const response = await axios.post(`${API_URL}/servicio`, servicio);
        return response.data;
      } catch (error) {
        throw new Error('Error al guardar el servicio');
    }
}