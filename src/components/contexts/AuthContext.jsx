import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const cookies = new Cookies();
    const [isLogged, setIsLogged] = useState(!!cookies.get("token"));

    // Verificar si el usuario está autenticado al cargar la página
    useEffect(() => {
        const token = cookies.get("token");
        if (token) setIsLogged(true);
    }, []);

    const logout = () => {
        cookies.remove('token'); // Eliminar el token de las cookies
        setIsLogged(false); // Actualizar el estado de autenticación
    };

    // Crear un objeto con las funciones y valores que se compartirán
    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para acceder al contexto de autenticación
export function useAuth() {
    return useContext(AuthContext);
}
