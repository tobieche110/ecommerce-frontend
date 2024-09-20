import CustomNavbar from "./CustomNavbar";
import { Card, ListGroup } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import AddRemoveStockButton from "./AddRemoveStockButton";

const Cart = () => {
    const products = [
        { name: "Producto 1", price: "$10.00", quantity: 1 },
        { name: "Producto 2", price: "$20.00", quantity: 2 },
        { name: "Producto 3", price: "$30.00", quantity: 3 },
        { name: "Producto 4", price: "$30.00", quantity: 3 },
    ];

    // Calcula el precio total de los productos en el carrito
    const calculateTotalPrice = () => {
        return products
            .reduce((total, product) => {
                const price = parseFloat(product.price.replace("$", ""));
                return total + price * product.quantity;
            }, 0)
            .toFixed(2);
    };

    // Calcula la cantidad total de productos en el carrito
    const calculateTotalProducts = () => {
        return products.reduce((total, product) => total + product.quantity, 0);
    };

    //Calcula el precio total de un producto (precio * cantidad)
    const calculateTotalProductPrice = (product) => {
        const price = parseFloat(product.price.replace("$", ""));
        return (price * product.quantity).toFixed(2);
    };

    return (
        <>
            <div className="container">
                <h1 className="mt-3">
                    <strong>Tu carrito</strong>
                </h1>
                <p>
                    En esta sección podrás encontrar los productos que agregaste
                    a tu carrito.
                </p>

                <div className="row mt-3">
                    <div className="col-md-8">
                        <ListGroup>
                            {products.map((product, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Card.Title>
                                                {product.name}
                                            </Card.Title>
                                            <div className="d-flex align-items-center">
                                                <AddRemoveStockButton
                                                    quantity={product.quantity}
                                                />
                                                <Card.Text className="mb-0 px-5">
                                                    {calculateTotalProductPrice(product)}
                                                </Card.Text>
                                                <MdDelete className="delete-button" />
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </ListGroup>
                    </div>
                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Resumen de compra</Card.Title>
                                <hr />
                                <Card.Text>
                                    Cantidad de productos (
                                    {calculateTotalProducts()})
                                </Card.Text>
                                <div className="d-flex justify-content-between fs-5">
                                    <Card.Text>
                                        <strong>Total</strong>
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>
                                            ${calculateTotalPrice()}
                                        </strong>
                                    </Card.Text>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary w-100">
                                        <strong>Comprar</strong>
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
