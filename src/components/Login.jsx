import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
            <Card className="mx-auto auth-card">
                <Card.Body>
                    <Card.Title className="mb-3" style={{ fontSize: "24px" }}><strong>Ingreso al Ecommerce</strong></Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control type="email" placeholder="Ingrese su usuario" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese su contraseña" />
                        </Form.Group>
                        
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" className="rounded-pill">
                                Ingresar
                            </Button>
                        </div>
                        <p className="text-center mt-3">¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
