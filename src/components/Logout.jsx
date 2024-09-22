import { useAuth } from '../components/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
    const { logout } = useAuth(); // Obtenemos la función logout desde el contexto
    const navigate = useNavigate();

    useEffect(() => {
        if (logout) {
            logout();  // Llamamos a la función logout para eliminar el token y actualizar el estado
            window.location.reload();
            navigate('/login');  // Redirigimos al login
        }
    }, [logout, navigate]);

    return null;
};

export default Logout;
