import { ButtonGroup, Button } from "react-bootstrap";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { CartContext } from "./contexts/CartContext";
import { useContext, useEffect, useState } from "react";
import { getProducts } from "./ApiRequests";

const AddRemoveStockButton = ({ product }) => {
    const { addOneToCart, removeFromCart, checkStock } =
        useContext(CartContext);
    const [products, setProducts] = useState([]);

    // Obtenemos los productos para verificar el stock
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <ButtonGroup size="sm">
            <Button
                size="sm"
                variant="dark"
                onClick={() => removeFromCart(product.id)}
            >
                <CgMathMinus />
            </Button>
            <Button size="sm" active variant="secondary">
                {product.quantity}
            </Button>
            <Button
                size="sm"
                variant="dark"
                disabled={
                    !products.find((p) => p.id === product.id) ||
                    checkStock(products.find((p) => p.id === product.id))
                }
                onClick={() => addOneToCart(product.id)}
            >
                <CgMathPlus />
            </Button>
        </ButtonGroup>
    );
};

export default AddRemoveStockButton;
