/*               Aqui se manejan dos cosas 
1. La URL de la API
2. El token de autenticacion para las solicitudes que lo necesiten*/
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    // NO enviar token en login | register
    if (
        token &&
        config.url !== "/auth/login" &&
        config.url !== "/auth/register"
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;