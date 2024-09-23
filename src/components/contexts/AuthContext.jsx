import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { CartContext } from "./CartContext";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const cookies = new Cookies();
    const [isLogged, setIsLogged] = useState(!!cookies.get("token"));
    const [userRole, setUserRole] = useState("");
    const [username, setUserName] = useState("");
    const [userId, setUserId] = useState(0);
    const { setCart } = useContext(CartContext);

    // Verificar si el usuario está autenticado al cargar la página
    useEffect(() => {
        const token = cookies.get("token");

        if (token) {
            const decodedToken = jwtDecode(token);
            setUserName(token ? decodedToken.sub : "");
            setUserRole(token ? decodedToken.role : "");
            setUserId(token ? decodedToken.id : 0);
            setIsLogged(true);
        }
    }, []);

    const logout = () => {
        cookies.remove("token"); // Eliminar el token de las cookies
        cookies.remove("cart"); // Eliminar el carrito de las cookies
        cookies.remove("role"); // Eliminar el rol de las cookies
        cookies.remove("username"); // Eliminar el nombre de usuario de las cookies
        cookies.remove("userId"); // Eliminar el id de usuario de las cookies
        setCart([]); // Limpiar el carrito
        setUserRole(""); // Limpiar el rol del usuario
        setUserName(""); // Limpiar el nombre de usuario
        setIsLogged(false); // Actualizar el estado de autenticación
    };

    // Crear un objeto con las funciones y valores que se compartirán
    return (
        <AuthContext.Provider
            value={{
                isLogged,
                setIsLogged,
                userRole,
                setUserRole,
                logout,
                username,
                setUserName,
                userId,
                setUserId,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook para acceder al contexto de autenticación
export function useAuth() {
    return useContext(AuthContext);
}
