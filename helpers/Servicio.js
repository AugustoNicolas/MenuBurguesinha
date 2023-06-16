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
}