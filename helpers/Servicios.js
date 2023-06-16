import axios from "axios";
import { API_URL } from "./config";

export const getListaServicios = async () => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Sumar 1 ya que los meses en JavaScript son base 0 (enero es 0)

    const response = await axios.get(`${API_URL}/servicio/mes/${currentMonth}`);
    const servicios = response.data;
    
    // Ordenar las fechas de menor a mayor
    servicios.sort((a, b) => new Date(a.fecha_init) - new Date(b.fecha_init));

    console.log(servicios);
    return servicios;
  } catch (error) {
    // Manejar el error aquí
    console.error("Error al obtener la lista de servicios:", error);
    return null;
  }
};
