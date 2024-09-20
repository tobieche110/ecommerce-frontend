import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { PiShoppingCartThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
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
                        <Nav.Link href="#about">Gestionar Productos</Nav.Link>
                        <Nav.Link href="#services">
                            Ver listado de clientes
                        </Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/cart">
                            Carrito{" "}
                            <PiShoppingCartThin style={{ fontSize: "1.5em" }} />
                        </Nav.Link>
                        <Nav>
                            <NavDropdown
                                title="Mi cuenta"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#logout">
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
