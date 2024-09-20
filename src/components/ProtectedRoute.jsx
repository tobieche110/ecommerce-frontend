import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";  // El contexto de autenticación

export function ProtectedRoute({ children }) {
    const { isLogged } = useAuth();

    if (!isLogged) {
        return <Navigate to="/login" />;
    }

    return children;
}
