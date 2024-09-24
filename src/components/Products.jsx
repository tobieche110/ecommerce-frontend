import React, { useState } from "react";
import { Table, Button, Form, Card, Modal } from "react-bootstrap";
import { useEffect } from "react";
import {
    getProducts,
    deleteProduct,
    addProduct,
    updateProduct,
} from "./ApiRequests";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        id: "",
        name: "",
        price: "",
        stock: 0,
    });

    // Obtener productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
                alert(
                    "Hubo un error al obtener los productos. Inténtalo de nuevo."
                );
            }
        };
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Agregar producto a la BDD al presionar el botón
    const addProductToDB = async () => {
        if (!newProduct.name || !newProduct.price || newProduct.stock < 0) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const productResponse = await addProduct(newProduct);
            setProducts([...products, productResponse]);
            setNewProduct({ name: "", price: "", stock: "" });
        } catch (error) {
            console.error("Error al añadir el producto:", error);
            alert("Hubo un error al añadir el producto. Inténtalo de nuevo.");
        }
    };

    const deleteProductOnDB = async (index, productId) => {
        try {
            const confirmDelete = window.confirm(
                "¿Estás seguro de que deseas eliminar este producto?"
            );
            if (!confirmDelete) return;

            await deleteProduct(productId);
            const updatedProducts = products.filter((_, i) => i !== index);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("Hubo un error al eliminar el producto. Inténtalo de nuevo.");
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState({
        id: "",
        name: "",
        price: "",
        stock: "",
    });

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const openEditModal = (product) => {
        setEditProduct(product);
        setShowModal(true);
    };

    const closeEditModal = () => {
        setShowModal(false);
    };

    // Guardar los cambios al editar un producto
    const saveEditedProduct = async () => {
        try {
            if (!editProduct.name || !editProduct.price || !editProduct.stock) {
                alert("Todos los campos son obligatorios");
                return;
            }

            await updateProduct(editProduct);
            // Actualizar el producto en el estado products
            const updatedProducts = products.map((product) =>
                product.id === editProduct.id ? editProduct : product
            );
            setProducts(updatedProducts);

            setShowModal(false);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert(
                "Hubo un error al actualizar el producto. Inténtalo de nuevo."
            );
        }
    };

    return (
        <div className="container">
            <h1>
                <strong>Productos</strong>
            </h1>
            <p>En esta sección podrás administrar los productos.</p>
            <h2>Añadir Producto</h2>
            <Card className="mb-3">
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                <strong>Nombre del producto</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <strong>Precio</strong>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <strong>Stock</strong>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={newProduct.stock}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button
                            className="mt-3"
                            variant="primary"
                            onClick={addProductToDB}
                        >
                            Añadir Producto
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre del producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => openEditModal(product)}
                                    className="me-2"
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        deleteProductOnDB(index, product.id)
                                    }
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={closeEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                <strong>Nombre del producto</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editProduct.name}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <strong>Precio</strong>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={editProduct.price}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <strong>Stock</strong>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={editProduct.stock}
                                onChange={handleEditInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEditModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={saveEditedProduct}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Products;
