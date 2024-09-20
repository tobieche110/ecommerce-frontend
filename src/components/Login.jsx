import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./ApiRequests";
import Cookies from "universal-cookie";
import { useAuth } from "./contexts/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { setIsLogged } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Por favor, complete todos los campos");
            return;
        }

        const response = await login(username, password);
        if (response.error) {
            setError(response.error);
        } else if (response.token) {
            cookies.set("token", response.token);
            setIsLogged(true);
            navigate("/catalog");
        } else {
            setError("Error en el servidor");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center "
            style={{ height: "100vh" }}
        >
            <Card className="mx-auto auth-card">
                <Card.Body>
                    <Card.Title className="mb-3" style={{ fontSize: "24px" }}>
                        <strong>Ingreso al Ecommerce</strong>
                    </Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {error && <p className="text-danger">{error}</p>}

                        <div className="d-grid gap-2">
                            <Button
                                variant="primary"
                                type="submit"
                                className="rounded-pill"
                            >
                                Ingresar
                            </Button>
                        </div>
                        <p className="text-center mt-3">
                            ¿No tienes una cuenta?{" "}
                            <Link to="/register">Regístrate</Link>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
