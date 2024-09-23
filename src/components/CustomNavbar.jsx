import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { PiShoppingCartThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { CartContext } from "./contexts/CartContext";
import { useContext } from "react";
import { useAuth } from "./contexts/AuthContext";

const CustomNavbar = () => {
    const { cart, calculateTotalProducts } = useContext(CartContext);
    const { username, userRole } = useAuth();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-between">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/catalog">
                            Catálogo
                        </Nav.Link>
                        <Nav.Link as={Link} to={"/change-date"}>
                            Cambiar fecha del sistema
                        </Nav.Link>
                        {userRole === "ADMIN" && (
                            <>
                                <Nav.Link as={Link} to={"/admin/products"}>
                                    Gestionar Productos
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/admin/clients"}>
                                    Ver listados de clientes
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/cart">
                            Carrito{" "}
                            <PiShoppingCartThin style={{ fontSize: "1.5em" }} />
                            {calculateTotalProducts() > 0 && (
                                <span style={{ fontSize: "0.75em" }}>
                                    ({calculateTotalProducts()})
                                </span>
                            )}
                        </Nav.Link>
                        <Nav>
                            <NavDropdown
                                title={`Bienvenido, ${username}`}
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item as={Link} to={"/logout"}>
                                    Cerrar sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
