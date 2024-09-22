import { Card, ListGroup } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import AddRemoveStockButton from "./AddRemoveStockButton";
import { CartContext } from "./contexts/CartContext";
import { useContext } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useDate } from "./contexts/DateContext";
import { useState } from "react";
import { getDiscounts } from "./ApiRequests";
import { useEffect } from "react";

const Cart = () => {
    const products = useContext(CartContext).cart;
    const userRole = useAuth().userRole;
    const { date } = useDate();
    const { calculateTotalProducts, removeProductFromCart } =
        useContext(CartContext);

    const [totalPrice, setTotalPrice] = useState(0); // Precio total de los productos en el carrito

    const [discountToApply, setDiscountToApply] = useState({}); // ID de descuento a aplicar

    // Calcula el precio total de los productos en el carrito sin descuentos
    const calculateTotalPriceWithoutDiscount = () => {
        return products.reduce((total, product) => {
            const price = parseFloat(product.price.replace("$", ""));
            return total + price * product.quantity;
        }, 0);
    };

    // Calcula el precio total de los productos en el carrito, aplicando descuentos
    useEffect(() => {
        const calculateTotalPrice = async () => {
            const totalProducts = calculateTotalProducts();
            const discounts = await getDiscounts();
            console.log(products);

            // Filtra los descuentos que aplican para el usuario y deja donde discount.roleForDiscount es nulo
            const applicableDiscounts = discounts.filter(
                (discount) =>
                    discount.roleForDiscount === null ||
                    discount.roleForDiscount === userRole
            );
            console.log(userRole);
            console.log(discounts);
            console.log("applicableDiscount");
            console.log(applicableDiscounts);

            // Filtra los descuentos por total de productos
            // applicableDiscounts.productCountMin y applicableDiscount.productCountMax son los rangos de productos. Si es 0, no se toma en cuenta
            const applicableDiscountsByProductCount =
                applicableDiscounts.filter(
                    (discount) =>
                        (discount.productCountMin === 0 ||
                            discount.productCountMin <= totalProducts) &&
                        (discount.productCountMax === 0 ||
                            discount.productCountMax >= totalProducts)
                );

            console.log("applicableDiscountByProductCount ");
            console.log(applicableDiscountsByProductCount);

            // Probamos el total con cada descuento y los guardamos en un array
            // Tenemos en cuenta applicableDiscountsByProductCount.discountPercentage (porcentaje de descuento), applicableDiscountsByProductCount.discountAmount (monto de descuento neto) y applicableDiscountsByProductCount.freeCheapestProductCount (cantidad de productos gratis, desde los mas baratos)
            // En el array tendremos el objeto del descuento y el precio total con el descuento aplicado
            const totalPricesWithDiscounts =
                applicableDiscountsByProductCount.map((discount) => {
                    let total = calculateTotalPriceWithoutDiscount();

                    // Aplicamos el descuento de productos gratis
                    if (discount.freeCheapestProductCount > 0) {
                        const cheapestProducts = products
                            // Ordenamos los productos por precio de menor a mayor
                            .sort((a, b) => a.price - b.price)
                            // Quitamos del array cheapestProducts los productos mas baratos (los primeros hasta freeCheapestProductCount)
                            .slice(0, discount.freeCheapestProductCount);
                        // Calculamos el precio total sumando los productos de cheapestProducts
                        const cheapestProductsTotal = cheapestProducts.reduce(
                            (total, product) =>
                                total + calculateTotalProductPrice(product),
                            0
                        );
                        total = cheapestProductsTotal;
                    }

                    // Restamos el descuento porcentual sobre el total
                    if (discount.discountPercentage > 0) {
                        total -= total * (discount.discountPercentage / 100);
                    }

                    // Restamos el descuento por monto sobre el total
                    if (discount.discountAmount > 0) {
                        total -= discount.discountAmount;
                    }

                    return {
                        discount,
                        total,
                    };
                });

            console.log("totalPricesWithDiscounts");
            console.log(totalPricesWithDiscounts);
            // Si el de mayor descuento tiene .validDates y la fecha de hoy no está en ese array, sacamos este descuento del array, sino lo dejamos como estaba
            const validDateDiscounts = totalPricesWithDiscounts.filter(
                ({ discount }) =>
                    discount.validDates.length === 0 ||
                    discount.validDates.includes(date.toISOString().split('T')[0])
            );

            console.log("validDateDiscounts");
            console.log(validDateDiscounts);

            // Por ultimo, tomamos el total menor y lo guardamos en el estado
            const maxDiscount = validDateDiscounts.reduce((max, current) =>
                max.total < current.total ? max : current
            );

            console.log("maxDiscount");
            console.log(maxDiscount);

            setDiscountToApply(maxDiscount);
        };

        calculateTotalPrice();
    }, [calculateTotalProducts, userRole, products]);

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
                                <div className="d-flex justify-content-between fs-5">
                                    <Card.Text>
                                        <strong>Total</strong>
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>
                                            ${totalPrice.toFixed(2)}
                                        </strong>
                                    </Card.Text>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-primary w-100"
                                        disabled={calculateTotalProducts() <= 0}
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
