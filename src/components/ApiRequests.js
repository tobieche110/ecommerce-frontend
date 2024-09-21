import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get('token');

// URL de la API
const url = "http://localhost:8080";

// Login
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${url}/auth/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Registro
export const register = async (username, password) => {
    try {
        const response = await axios.post(`${url}/auth/register`, {
            username,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Obtener productos
export const getProducts = async () => {
    try {
        const response = await axios.get(`${url}/api/product/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
