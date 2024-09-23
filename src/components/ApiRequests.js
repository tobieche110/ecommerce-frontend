import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

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
        const response = await axios.post(
            `${url}/auth/register`,
            {
                username,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
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
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Eliminar producto
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${url}/api/admin/product/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Agregar producto
export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${url}/api/admin/product/add`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Modificar producto
export const updateProduct = async (product) => {
    try {
        const response = await axios.put(`${url}/api/admin/product/update`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Obtener descuentos
export const getDiscounts = async () => {
    try {
        const response = await axios.get(`${url}/api/discount/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Obtener mejor descuento para el usuario
export const getBestDiscountForUser = async (products) => {
    try {
        const response = await axios.post(
            `${url}/api/discount/get/best`,
            products,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Realizar compra
export const createSaleOrder = async (saleOrder) => {
    try {
        const response = await axios.post(
            `${url}/api/sales-order/add`,
            saleOrder,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// Obtener lista de usuarios VIP
export const getVipUsers = async () => {
    try {
        const response = await axios.get(`${url}/api/admin/user/all/vip`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Obtener lista de usuarios que obtuvieron VIP en un mes y año específico
export const getVipUsersByMonthAndYear = async (month, year) => {
    try {
        const response = await axios.get(`${url}/api/admin/user/vip/got/${year}/${month}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Obtener lista de usuarios que perdieron VIP en un mes y año específico
export const getLostVipUsersByMonthAndYear = async (month, year) => {
    try {
        const response = await axios.get(`${url}/api/admin/user/vip/lost/${year}/${month}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};