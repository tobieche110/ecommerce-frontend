import { ButtonGroup, Button } from "react-bootstrap";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

const AddRemoveStockButton = ({ quantity }) => {
    return (  
        <ButtonGroup size="sm">
            <Button size="sm" variant="dark"><CgMathMinus /></Button>
            <Button size="sm" active variant="secondary">{quantity}</Button>
            <Button size="sm" variant="dark"><CgMathPlus /></Button>
        </ButtonGroup>
    );
}
 
export default AddRemoveStockButton;