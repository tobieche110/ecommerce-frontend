import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
import { register, login } from "./ApiRequests";
import { useAuth } from "./contexts/AuthContext";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState(null);

    const cookies = new Cookies();
    const navigate = useNavigate();
    const { setIsLogged } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (!username || !password || !repeatPassword) {
            setError("Todos los campos son obligatorios");
            return;
        }

        const response = await register(username, password);
        if (response.error) {
            setError(response.error);
        } else if (response.username) {
            const loginResponse = await login(username, password);
            cookies.set("token", loginResponse.token);
            setIsLogged(true);
            window.location.reload();
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
                        <strong>Regístrate al Ecommerce</strong>
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

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicRepeatPassword"
                        >
                            <Form.Label>Repetir contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repita su contraseña"
                                value={repeatPassword}
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                            />
                        </Form.Group>

                        <p className="text-danger">{error}</p>

                        <div className="d-grid gap-2">
                            <Button
                                variant="primary"
                                type="submit"
                                className="rounded-pill"
                            >
                                Registrarse
                            </Button>
                        </div>
                        <p className="text-center mt-3">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login">Ingresa</Link>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;
