import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const cookies = new Cookies();
    const [cart, setCart] = useState([]);

    // Cargar el carrito desde las cookies al iniciar la app
    useEffect(() => {
        const savedCart = cookies.get("cart") || [];
        setCart(savedCart);
    }, []);

    // Guardar el carrito en las cookies cuando cambie
    useEffect(() => {
        cookies.set("cart", cart);
    }, [cart]);

    // Agregar un producto al carrito
    const addToCart = (product) => {
        // Buscar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(
            (item) => item.id === product.id
        );
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, verificamos si supera el stock
            if (checkStock(product)) {
                alert(
                    "No hay suficiente stock disponible para seguir agregando este producto."
                );
                return;
            }

            const updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCart(updatedCart);
        } else {
            // Si el producto no está en el carrito, agregarlo
            const productItem = {
                id: product.id,
                name: product.name,
                price: product.price.toString(),
                quantity: 1,
            };
            setCart((prevCart) => [...prevCart, productItem]);
        }
    };

    // Verificar si el producto seleccionado supera el stock disponible
    const checkStock = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        const productInCatalog = product.stock;

        // Si el producto ya está en el carrito y la cantidad supera el stock retornamos true
        if (productInCart && productInCart.quantity >= productInCatalog) {
            return true;
        }
        
        return false;
    };

    // Agregar + 1 a la cantidad de un producto en el carrito a partir de su Id
    const addOneToCart = (productId) => {
        const updatedCart = cart.map((item) =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);
    };

    // Eliminar una unidad de un producto del carrito
    const removeFromCart = (productId) => {
        const updatedCart = cart
            .map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);
        setCart(updatedCart);
    };

    // Elimina completamente un producto del carrito a partir de su Id
    const removeProductFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

    // Calcula la cantidad total de productos en el carrito
    const calculateTotalProducts = () => {
        return cart.reduce((total, product) => total + product.quantity, 0);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                clearCart,
                calculateTotalProducts,
                addOneToCart,
                removeFromCart,
                removeProductFromCart,
                setCart,
                clearCart,
                checkStock,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
