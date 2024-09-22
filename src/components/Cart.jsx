import { Card, ListGroup } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import AddRemoveStockButton from "./AddRemoveStockButton";
import { CartContext } from "./contexts/CartContext";
import { useContext } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useDate } from "./contexts/DateContext";
import { useState } from "react";
import { getBestDiscountForUser, createSaleOrder } from "./ApiRequests";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const products = useContext(CartContext).cart;
    const clearCart = useContext(CartContext).clearCart;
    const navigate = useNavigate();
    const userRole = useAuth().userRole;
    const userId = useAuth().userId;
    const { date } = useDate();
    const { calculateTotalProducts, removeProductFromCart } =
        useContext(CartContext);

    const [totalPrice, setTotalPrice] = useState(0); // Precio total de los productos en el carrito

    const [discountToApply, setDiscountToApply] = useState({
        discount: {
            name: "",
            productCountMin: 0,
            productCountMax: 0,
            roleForDiscount: null,
            discountPercentage: 0.0,
            discountAmount: 0,
            freeCheapestProductCount: 0,
            validDates: [],
        },
        total: 0,
    });

    // Lógica para realizar la compra
    const handleSubmit = async () => {
        // Armamos objeto para enviar por request
        const salesOrder = {
            user: { id: userId },
            productsId: products.flatMap((product) =>
                Array(product.quantity).fill(product.id)
            ),
            totalPrice: discountToApply.total
                ? discountToApply.total
                : calculateTotalPriceWithoutDiscount(),
            date: date,
        };
        try {
            const response = await createSaleOrder(salesOrder);
            console.log("Orden de venta creada:", response);
            clearCart();
            navigate("/catalog");
        } catch (error) {
            console.error("Error al crear la orden de venta:", error);
        }
        
    };

    // Consulta el mejor descuento para el usuario y su carrito
    useEffect(() => {
        const getBestDiscount = async () => {
            // Enviamos la fecha con todos los elementos de products, la agregamos al objeto
            const productsWithDate = products.map((product) => {
                return { ...product, date: date.toISOString().split("T")[0] };
            });
            const bestDiscount = await getBestDiscountForUser(productsWithDate);
            setDiscountToApply(bestDiscount);
        };
        getBestDiscount();
    }, [products]);

    // Calcula el precio total de los productos en el carrito sin descuentos
    const calculateTotalPriceWithoutDiscount = () => {
        return products.reduce((total, product) => {
            const price = parseFloat(product.price.replace("$", ""));
            return total + price * product.quantity;
        }, 0);
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
                                                    product={product}
                                                />
                                                <Card.Text className="mb-0 px-5">
                                                    {calculateTotalProductPrice(
                                                        product
                                                    )}
                                                </Card.Text>
                                                <MdDelete
                                                    className="delete-button"
                                                    onClick={() =>
                                                        removeProductFromCart(
                                                            product.id
                                                        )
                                                    }
                                                />
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
                                <Card.Text>
                                    Precio total sin descuentos:{" "}
                                    <strong>
                                        ${calculateTotalPriceWithoutDiscount()}
                                    </strong>
                                </Card.Text>
                                {discountToApply.discount &&
                                    discountToApply.discount.name && (
                                        <Card.Text>
                                            Descuento:{" "}
                                            <strong>
                                                {discountToApply.discount.name}
                                            </strong>
                                        </Card.Text>
                                    )}
                                {discountToApply.discount &&
                                    discountToApply.discount
                                        .freeCheapestProductCount > 0 && (
                                        <Card.Text>
                                            <strong>
                                                Productos bonificados:
                                            </strong>{" "}
                                            {
                                                discountToApply.discount
                                                    .freeCheapestProductCount
                                            }
                                        </Card.Text>
                                    )}
                                {discountToApply.discount &&
                                    discountToApply.discount
                                        .discountPercentage > 0 && (
                                        <Card.Text>
                                            <strong>
                                                -
                                                {
                                                    discountToApply.discount
                                                        .discountPercentage
                                                }
                                                %
                                            </strong>{" "}
                                            de descuento
                                        </Card.Text>
                                    )}
                                {discountToApply.discount &&
                                    discountToApply.discount.discountAmount >
                                        0 && (
                                        <Card.Text>
                                            <strong>
                                                -$
                                                {
                                                    discountToApply.discount
                                                        .discountAmount
                                                }
                                            </strong>{" "}
                                            de descuento
                                        </Card.Text>
                                    )}
                                <div className="d-flex justify-content-between fs-5">
                                    <Card.Text>
                                        <strong>Total</strong>
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>
                                            $
                                            {discountToApply.total
                                                ? discountToApply.total
                                                : calculateTotalPriceWithoutDiscount()}
                                        </strong>
                                    </Card.Text>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-primary w-100"
                                        disabled={calculateTotalProducts() <= 0}
                                        onClick={handleSubmit}
                                    >
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
