import { ButtonGroup, Button } from "react-bootstrap";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { CartContext } from "./contexts/CartContext";
import { useContext } from "react";

const AddRemoveStockButton = ({ product }) => {
    const { addOneToCart, removeFromCart } = useContext(CartContext);

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
                onClick={() => addOneToCart(product.id)}
            >
                <CgMathPlus />
            </Button>
        </ButtonGroup>
    );
};

export default AddRemoveStockButton;
