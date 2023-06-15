import axios from "axios"
import { API_URL } from "./config";


//recibe un usuario y si no existe lo agrega a la DB... pero de igual manera lo recibe xd
export const postPlato = async (plato) =>{
    try{
        const resp = await axios.post(`${API_URL}/plato`, plato);
        return resp.data
    } catch(error){
        // Manejar el error aquí
        // if (error.response) {
        //  // La petición se hizo y el servidor respondió con un código de estado fuera del rango de 2xx
        //  console.log(error.response.data);
        //  console.log(error.response.status);
        //  console.log(error.response.headers);
        // } else if (error.request) {
        //  // La petición se hizo pero no se recibió respuesta
        //  console.log(error.request);
        // } else {
        //  // Algo pasó al preparar la petición que lanzó un error
        //  console.log('Error', error.message);
        // }
        // return error
        }
        return null
       
}