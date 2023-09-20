// Importa la librería axios para hacer peticiones HTTP.
import axios from "axios";

// Crea una instancia de axios con una configuración personalizada.
// Esta instancia está pre-configurada para enviar peticiones a una URL base,
// que es construida usando una variable de entorno.
const clienteAxios = axios.create({ 
    // Define la URL base para todas las peticiones que se hagan con esta instancia.
    // Se concatena '/api' al final de la URL base para apuntar al endpoint de API.
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
})

// Exporta la instancia personalizada de axios para ser utilizada en otras partes del proyecto.
export default clienteAxios;
