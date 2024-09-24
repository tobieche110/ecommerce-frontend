import { useContext, useState, useEffect } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import { CartContext } from "./contexts/CartContext";
import { getProducts } from "./ApiRequests";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart, cart } = useContext(CartContext);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los productos.");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const response = addToCart(product);
        if (response) {
            setToastMessage(`${product.name} ha sido agregado al carrito.`);
            setShowToast(true);
        }
    };

    if (loading) {
        return (
            <div className="container mt-3">
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <h1 className="mt-3">
                <strong>Catálogo</strong>
            </h1>
            <p>
                En esta sección podrás encontrar todos los productos disponibles
                en nuestra tienda.
            </p>

            <div className="row">
                {products.map((product) => (
                    <div className="col-md-3 mb-4" key={product.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <div className="d-flex justify-content-center">
                                    {product.stock > 0 ? (
                                        <button
                                            className="btn btn-primary rounded-pill"
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                        >
                                            <PiShoppingCartThin
                                                style={{ fontSize: "1.5em" }}
                                            />{" "}
                                            Agregar al carrito
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary rounded-pill"
                                            disabled
                                        >
                                            <PiShoppingCartThin
                                                style={{ fontSize: "1.5em" }}
                                            />{" "}
                                            Sin Stock
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Notificación</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Catalog;
