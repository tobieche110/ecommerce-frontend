import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { CartContext } from "./CartContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const cookies = new Cookies();
    const [isLogged, setIsLogged] = useState(!!cookies.get("token"));
    const [userRole, setUserRole] = useState("");
    const [username, setUserName] = useState("");
    const { setCart } = useContext(CartContext);

    // Verificar si el usuario está autenticado al cargar la página
    useEffect(() => {
        const token = cookies.get("token");
        setUserName(cookies.get("username"));
        setUserRole(cookies.get("role"));
        if (token) setIsLogged(true);
    }, []);

    const logout = () => {
        cookies.remove("token"); // Eliminar el token de las cookies
        cookies.remove("cart"); // Eliminar el carrito de las cookies
        setCart([]); // Limpiar el carrito
        setUserRole(""); // Limpiar el rol del usuario
        setUserName(""); // Limpiar el nombre de usuario
        setIsLogged(false); // Actualizar el estado de autenticación
    };

    // Crear un objeto con las funciones y valores que se compartirán
    return (
        <AuthContext.Provider
            value={{ isLogged, setIsLogged, userRole, setUserRole, logout, username, setUserName }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook para acceder al contexto de autenticación
export function useAuth() {
    return useContext(AuthContext);
}
